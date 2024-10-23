import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFilter } from './context/FilterContext';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, Star } from 'lucide-react';

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

    const location = useLocation(); // Get the current path

    const [categories, setCategories] = useState([]);
    const keywords = ["apple", "watch", "fashion", "trend", "shoes", "shirt"];
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [followStatus, setFollowStatus] = useState([false, false, false]); // Manage follow/unfollow state for multiple users

    const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state

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

    const toggleFollow = (index) => {
        setFollowStatus((prevState) => {
            const updatedStatus = [...prevState];
            updatedStatus[index] = !updatedStatus[index];
            return updatedStatus;
        });
    };

    const renderStarRating = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <Star key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-400'} />
            );
        }
        return stars;
    };

    const handleLogout = () => {
        setIsLoggedIn(false); // Set login state to false on logout
        toggleDropdown(); // Close dropdown after logout
    };

    const users = [
        { name: "John Doe", rating: 4, avatar: "https://via.placeholder.com/50" },
        { name: "Jane Smith", rating: 5, avatar: "https://via.placeholder.com/50" },
        { name: "Alex Johnson", rating: 3, avatar: "https://via.placeholder.com/50" },
    ];

    // Don't render SideBar if on login or signup page
    if (location.pathname === '/login' || location.pathname === '/signup') {
        return null;
    }

    return (
        <div className="py-6 px-4 lg:px-8">
            {/* Login/Logout Dropdown */}
            <div className="relative mb-4">
                <button
                    onClick={toggleDropdown}
                    className="bg-gray-800 text-white py-2 px-4 rounded w-full md:w-auto"
                >
                    <span>Account</span>
                </button>
                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-full md:w-48 bg-white border rounded shadow-lg z-10">
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="block px-4 py-2 text-left text-gray-800 hover:bg-gray-100 w-full"
                            >
                                 
                            </button>
                        ) : (
                            <>
                                <Link to="/login">
                                    <button
                                        onClick={() => { toggleDropdown(); }} // Close dropdown on click
                                        className="block px-4 py-2 text-left text-gray-800 hover:bg-gray-100 w-full"
                                    >
                                       Logout 
                                    </button>
                                </Link>
                                <Link to="/signup">
                                    <button
                                        onClick={() => { toggleDropdown(); }} // Close dropdown on click
                                        className="block px-4 py-2 text-left text-gray-800 hover:bg-gray-100 w-full"
                                    >
                                    
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Search Input with Search Icon */}
            <div className="mb-4 relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-gray-500" />
                </span>
                <input
                    className="border border-black rounded-lg p-2 pl-10 w-full"
                    type="text"
                    placeholder="Search product"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Price Filters */}
            <div className="flex mb-4 gap-2">
                <input
                    className="border border-black rounded-lg p-2 w-1/2"
                    type="text"
                    placeholder="Min"
                    value={minPrice || ''}
                    onChange={handleMinPrice}
                />
                <input
                    className="border border-black rounded-lg p-2 w-1/2"
                    type="text"
                    placeholder="Max"
                    value={maxPrice || ''}
                    onChange={handleMaxPrice}
                />
            </div>

            {/* Category Section */}
            <div className="my-4">
                <h1 className="font-bold text-xl">Category</h1>
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

            {/* Keywords Section */}
            <div className="my-3">
                <h1 className="font-bold text-xl">Keywords</h1>
                <div className="my-4 grid grid-cols-2 gap-2">
                    {keywords.map((keyword, index) => (
                        <button
                            key={index}
                            onClick={() => handleKeyWordClick(keyword)}
                            className="px-4 py-2 text-left border rounded hover:bg-gray-200"
                        >
                            {keyword.toUpperCase()}
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleResetFilter}
                    className="mt-5 text-white bg-black w-full p-3 rounded-lg"
                >
                    Reset Filter
                </button>
            </div>

            {/* User Profiles Section */}
            <div className="mt-6 space-y-6">
                {users.map((user, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg p-4">
                        <div className="flex items-center">
                            <img
                                src={user.avatar}
                                alt={`${user.name}'s Avatar`}
                                className="w-16 h-16 rounded-full border border-gray-300"
                            />
                            <div className="ml-4">
                                <h2 className="text-xl font-bold">{user.name}</h2>
                                <div className="flex items-center mt-2">
                                    {renderStarRating(user.rating)}
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <button
                                onClick={() => toggleFollow(index)}
                                className={`w-full py-2 rounded-lg ${followStatus[index] ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
                            >
                                {followStatus[index] ? 'Unfollow' : 'Follow'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SideBar;
