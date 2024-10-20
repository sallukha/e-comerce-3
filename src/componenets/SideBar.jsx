import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFilter } from './context/FilterContext';
import { Link } from 'react-router-dom';

const SideBar = () => {
    const {
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
    } = useFilter();

    const [categories, setCategories] = useState([]);
    const keywords = ["apple", "watch", "fashion", "trend", "shoes", "shirt"];
    const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://dummyjson.com/products");
                const data = response.data;
                const newCategories = Array.from(
                    new Set(data.products.map((product) => product.category))
                );
                setCategories(newCategories);
            } catch (error) {
                console.error("Error fetching data:", error);  
            }
        };
        fetchData();
    }, []);

    const handleMinPrice = (e) => {
        const value = e.target.value;
        setMinPrice(value ? parseFloat(value) : undefined);
    };

    const handleMaxPrice = (e) => {
        const value = e.target.value;
        setMaxPrice(value ? parseFloat(value) : undefined);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleKeyWordClick = (keyword) => {
        setKeywords(keyword);   
    };

    const handleResetFilter = () => {
        setSearchQuery("");
        setSelectedCategory("");
        setMinPrice(undefined);
        setMaxPrice(undefined);
        setKeywords("");
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className='py-10'>
            {/* Login and Signup Dropdown */}
            <div className="relative mb-4">
                <button
                    onClick={toggleDropdown}
                    className="bg-gray-800 text-white py-2 px-4 rounded"
                >
                    Account
                </button>
                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                        <Link to="/login">
                            <button
                                onClick={() => { toggleDropdown(); }} // Close dropdown on click
                                className="block px-4 py-2 text-left text-gray-800 hover:bg-gray-100 w-full"
                            >
                                Login
                            </button>
                        </Link>
                        <Link to="/signup">
                            <button
                                onClick={() => { toggleDropdown(); }} // Close dropdown on click
                                className="block px-4 py-2 text-left text-gray-800 hover:bg-gray-100 w-full"
                            >
                                Signup
                            </button>
                        </Link>
                    </div>
                )}
            </div>

            <div className="mb-4">
                <input
                    className='border border-black rounded-lg p-2 w-50'
                    type="text"
                    placeholder='Search product'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className="flex mb-4">
                <input
                    className='border border-black rounded-lg p-2 w-24 mr-2'
                    type="text"
                    placeholder='Min'
                    value={minPrice || ''}
                    onChange={handleMinPrice}
                />
                <input
                    className='border border-black rounded-lg p-2 w-24'
                    type="text"
                    placeholder='Max'
                    value={maxPrice || ''}
                    onChange={handleMaxPrice}
                />
            </div>

            <div className="my-4">
                <h1 className='font-bold text-xl'>Category</h1>
                <div className="py-5">
                    {categories.map((category, index) => (
                        <label key={index} className="block mb-2">
                            <input
                                type="radio"
                                value={category}
                                onChange={() => handleCategoryChange(category)}
                                checked={selectedCategory === category}
                            />
                            {category.toUpperCase()}
                        </label>
                    ))}
                </div>
            </div>

            <div className="my-3">
                <h1 className='font-bold text-xl'>Keywords</h1>
                <div className="my-4">
                    {keywords.map((keyword, index) => (
                        <button
                            key={index}
                            onClick={() => handleKeyWordClick(keyword)}  
                            className='block mb-2 px-4 py-2 w-50 text-left border rounded hover:bg-gray-200'
                        >
                            {keyword.toUpperCase()}
                        </button>
                    ))}
                </div>

                <button onClick={handleResetFilter} className='my-5 text-white bg-black w-55 p-3 rounded-lg'>
                    Reset Filter
                </button>
            </div>
        </div>
    );
};

export default SideBar;
