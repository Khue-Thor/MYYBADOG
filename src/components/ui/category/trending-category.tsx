"use client"

/* eslint-disable @next/next/no-img-element */
import React from "react";
import { trendingCategoryData } from "@/data/categories_data";
import { HeadLine } from "@/components/component";
import TrendingCategoryItems from "@/ui/category/trending-category-items";

const TrendingCategory = () => {
  return (
    <section className="py-24">
      <div className="container">
        <HeadLine
          text="Trending categories"
          image="https://cdn.jsdelivr.net/npm/emoji-datasource-apple@7.0.2/img/apple/64/26a1.png"
          classes="font-display text-jacarta-700 mb-8 text-center text-3xl dark:text-white"
        />

        {/* trending categories */}
        <Trending_categories_items />
      </div>
    </section>
  );
};

export default TrendingCategory;
