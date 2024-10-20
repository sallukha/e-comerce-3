import { createContext, useContext, useState } from "react";

const FilterContext = createContext(undefined);

export const FilterProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [minPrice, setMinPrice] = useState(undefined);
    const [maxPrice, setMaxPrice] = useState(undefined);
    const [keyWord, setKeywords] = useState("");

    return (
        <FilterContext.Provider
            value={{
                searchQuery,
                setSearchQuery,
                selectedCategory,
                setSelectedCategory,
                minPrice,
                setMinPrice,
                maxPrice,
                setMaxPrice,
                keyWord,
                setKeywords,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};

export const useFilter = () => {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error("useFilter must be used within a FilterProvider");
    }
    return context;
};
