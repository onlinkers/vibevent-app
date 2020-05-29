import React from "react";

import "./index.css";

import { EventCategoriesPayload } from "types/store";
import { arrayAlphabeticalComparer, filterArrayByArray } from "utils";

import { Tag } from "antd";
const { CheckableTag } = Tag;

interface Props {
    eventCategoryDefinitions: EventCategoriesPayload
    selectedCategories: string[]
    setSelectedCategories: Function
    loaded: boolean
}

const CategoryFilter = (props: Props) => {

    const {
        eventCategoryDefinitions,
        selectedCategories,
        setSelectedCategories,
        loaded
    } = props;

    const categoryKeys = Object.keys(eventCategoryDefinitions);
    const unselectedCategories = filterArrayByArray(categoryKeys, selectedCategories);

    const changeCategory = (add: boolean, key: string) => {

        // duplicate array to overcome component not-rendering
        let newSelected = [...selectedCategories];

        if(add) newSelected.push(key);
        else newSelected = newSelected.filter((category) => category !== key);
        
        newSelected = newSelected.sort(arrayAlphabeticalComparer());
        setSelectedCategories(newSelected);
    };

    return loaded ? (
    <div className="CategoryScroller">
        {selectedCategories.map((categoryKey) => 
            <CheckableTag
                key={categoryKey}
                // TODO: Import color from styles
                className="category-chip--active"
                onChange={(add) => changeCategory(add, categoryKey)}
                checked={true}
            >
            { eventCategoryDefinitions[categoryKey] }
            </CheckableTag>
        )}
        {unselectedCategories.map((categoryKey) => 
            <CheckableTag
                key={categoryKey}
                // TODO: Import color from styles
                className="category-chip"
                onChange={(add) => changeCategory(add, categoryKey)}
                checked={false}
            >
            { eventCategoryDefinitions[categoryKey] }
            </CheckableTag>
        )}
    </div>
    ) : null;
};

export default CategoryFilter;
