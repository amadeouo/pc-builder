"use client"

import type { Component } from "@/model/types/component";
import { create } from "zustand/react";

type ComponentsStore = {
  // state
  isLoading: boolean,
  selectedByCategory: Record<string, Component | null>,
  openCategoryId: string | null,

  // actions
  setIsLoading: (isLoading: boolean) => void,
  setOpenCategoryId: (categoryId: string | null) => void,
  onSelectedComponent: (categoryId: string, component: Component | null) => void,
}

export const useComponentsStore = create<ComponentsStore>((set) => ({
  isLoading: true,
  selectedByCategory: {},
  openCategoryId: null,

  setIsLoading: (isLoading) => set(() => ({ isLoading })),
  setOpenCategoryId: (openCategoryId) => set(() => ({ openCategoryId })),
  onSelectedComponent: (categoryId, component) => {
    set(state => ({
      selectedByCategory: {
        ...state.selectedByCategory,
        [categoryId]: component,
      },
    }))
  },
}))
