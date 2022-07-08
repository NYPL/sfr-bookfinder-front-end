import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { extractQueryParam } from "../util/LinkUtils";
import { flattenDeep } from "../util/Util";

type FeatureFlagContextType = {
  activeFeatureFlags: string[];
  setActiveFeatureFlags: (activeFeatureFlags: string[]) => void;
  isFlagActive: (flag: string) => boolean;
};

export const FeatureFlagContext =
  createContext<FeatureFlagContextType>(undefined);

export const FeatureFlagProvider: React.FC = ({ children }) => {
  const [activeFeatureFlags, setActiveFeatureFlags] = useState<string[]>([]);
  const isFlagActive = (flag: string) => {
    return activeFeatureFlags.includes(flag);
  };

  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    const storedFeatureFlagsStr = sessionStorage.getItem("features");
    let storedFeatureFlags: string[] = [];
    if (storedFeatureFlagsStr) {
      try {
        storedFeatureFlags = JSON.parse(storedFeatureFlagsStr);
      } catch (e) {
        throw new Error(e);
      }
    }
    const newFeatureFlags = flattenDeep([
      ...storedFeatureFlags,
      ...extractQueryParam(query, "feature"),
    ]);
    sessionStorage.setItem("features", JSON.stringify(newFeatureFlags));
    setActiveFeatureFlags(newFeatureFlags);
  }, [query]);

  return (
    <FeatureFlagContext.Provider
      value={{ activeFeatureFlags, setActiveFeatureFlags, isFlagActive }}
    >
      {children}
    </FeatureFlagContext.Provider>
  );
};

export default function useFeatureFlags() {
  const context = useContext(FeatureFlagContext);
  if (typeof context === "undefined") {
    throw new Error(
      "useFeatureFlags must be used within a FeatureFlagProvider"
    );
  }
  return context;
}
