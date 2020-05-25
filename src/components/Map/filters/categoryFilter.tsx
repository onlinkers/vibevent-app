import React from "react";

import "./index.css";

import { EventCategoriesPayload } from "types/store";
import { filterArrayByArray } from "utils";

interface Props {
    eventCategoryDefinitions: EventCategoriesPayload
    selectedCategories: string[]
    setSelectedCategories: Function
}

const CategoryFilter = (props: Props) => {

    const { innerWidth } = window;

    const {
        eventCategoryDefinitions,
        selectedCategories,
    } = props;

    const categoryKeys = Object.keys(eventCategoryDefinitions);
    const unselectedCategories = filterArrayByArray(categoryKeys, selectedCategories);

    const addCategory = (event) => {
        console.log("adding", event);
    };

    const removeCategory = (event) => {
        console.log("remove", event);
    };

    return innerWidth >= 800 ? (
    <div className="CategoryScroller">
        {selectedCategories.map((categoryKey) => 
            <div
                key={categoryKey}
                // TODO: Import color from styles
                className="category-chip--active"
                onClick={removeCategory}
            >
            { eventCategoryDefinitions[categoryKey] }
            </div>
        )}
        {unselectedCategories.map((categoryKey) => 
            <div
                key={categoryKey}
                // TODO: Import color from styles
                className="category-chip"
                onClick={addCategory}
            >
            { eventCategoryDefinitions[categoryKey] }
            </div>
        )}
    </div>
    ) : null;
};

export default CategoryFilter;
