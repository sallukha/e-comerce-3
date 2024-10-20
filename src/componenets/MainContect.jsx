import React, { useEffect, useState } from 'react';
import { useFilter } from './context/FilterContext';
import axios from 'axios';
import { Tally3 } from 'lucide-react';

const MainContect = () => {
    const { searchQuery, selectedCategory, minPrice, maxPrice, keyWord } = useFilter();
    const [product, setProduct] = useState([]);
    const [dropdown, setDropdown] = useState(false); // Boolean to toggle dropdown visibility
    const [filter, setFilter] = useState('');
    const [cart, setCart] = useState([]); // Cart state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6); // Show 6 products per page
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(''); // Payment method

    useEffect(() => {
        let url = 'https://dummyjson.com/products';
        if (keyWord) {
            url = `https://dummyjson.com/products/search?q=${keyWord}`;
        }
        axios
            .get(url)
            .then((response) => setProduct(response.data.products))
            .catch((error) => console.error('Error fetching products', error));
    }, [keyWord]);

    // Function to toggle dropdown visibility
    const toggleDropdown = () => {
        setDropdown(!dropdown);
    };

    // Function to handle filtering logic
    const applyFilter = (filterType) => {
        setFilter(filterType);
        setDropdown(false); // Close the dropdown after selecting a filter
        if (filterType === 'cheap') {
            setProduct((prevProducts) =>
                [...prevProducts].sort((a, b) => a.price - b.price)
            );
        } else if (filterType === 'expensive') {
            setProduct((prevProducts) =>
                [...prevProducts].sort((a, b) => b.price - a.price)
            );
        } else if (filterType === 'popular') {
            setProduct((prevProducts) =>
                [...prevProducts].sort((a, b) => b.rating - a.rating)
            );
        }
    };

    // Function to add item to cart
    const addToCart = (product) => {
        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            setCart(cart.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    // Function to remove item from cart
    const removeFromCart = (productId) => {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem.quantity > 1) {
            setCart(cart.map(item =>
                item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
            ));
        } else {
            setCart(cart.filter(item => item.id !== productId)); // Remove item if quantity is 1
        }
    };

    // Function to handle payment method selection
    const handlePayment = () => {
        if (!selectedPaymentMethod) {
            alert('Please select a payment method');
            return;
        }
        alert(`Payment successful with ${selectedPaymentMethod}!`);
        setCart([]); // Clear the cart after payment
    };

    // Function to filter products based on category, price, search query, and keyword
    const getFilteredProducts = () => {
        let filteredProducts = [...product]; // Start with all products

        if (selectedCategory) {
            filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
        }

        if (minPrice !== undefined) {
            filteredProducts = filteredProducts.filter(product => product.price >= minPrice);
        }

        if (maxPrice !== undefined) {
            filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
        }

        if (searchQuery) {
            filteredProducts = filteredProducts.filter(product =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (keyWord) {
            filteredProducts = filteredProducts.filter(product =>
                product.title.toLowerCase().includes(keyWord.toLowerCase())
            );
        }

        return filteredProducts;
    };

    // Pagination Logic
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = getFilteredProducts().slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(getFilteredProducts().length / itemsPerPage);

    return (
        <div className='relative py-10 mx-5'>
            {/* Button to toggle dropdown */}
            <div className="flex justify-end mb-5">
                <button className='bg-gray-200 p-2 rounded-md' onClick={toggleDropdown}>
                    <Tally3 />
                </button>
            </div>

            {/* Dropdown menu */}
            {dropdown && (
                <div className='absolute bg-white border shadow-md rounded-md mt-2 z-10'>
                    <button className='block px-4 py-2 hover:bg-gray-100' onClick={() => applyFilter('cheap')}>
                        Cheap
                    </button>
                    <button className='block px-4 py-2 hover:bg-gray-100' onClick={() => applyFilter('expensive')}>
                        Expensive
                    </button>
                    <button className='block px-4 py-2 hover:bg-gray-100' onClick={() => applyFilter('popular')}>
                        Popular
                    </button>
                </div>
            )}

            {/* Display products */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
                {currentProducts.map((prod) => (
                    <div key={prod.id} className='border p-5 rounded-lg shadow-md bg-white'>
                        <img src={prod.thumbnail} alt={prod.title} className='w-full h-48 object-cover rounded-md' />
                        <h2 className='mt-2 text-lg font-semibold'>{prod.title}</h2>
                        <p className='mt-1 text-green-700 font-bold'>${prod.price}</p>
                        <p className='text-sm text-gray-500'>Rating: {prod.rating}</p>
                        <button
                            className='bg-blue-500 text-white py-1 px-4 rounded-md mt-3'
                            onClick={() => addToCart(prod)}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-10">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`px-4 py-2 mx-1 border rounded-lg ${currentPage === index + 1 ? 'bg-black text-white' : 'bg-gray-200'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {/* Cart Summary - Moved to Bottom */}
            <div className="mt-10">
                <h2 className="text-lg font-bold">Cart ({cart.length} items)</h2>
                {cart.length > 0 ? (
                    <ul className="mt-3">
                        {cart.map((item) => (
                            <li key={item.id} className="mb-2 flex items-center justify-between">
                                <span>{item.title} - ${item.price}</span>
                                <div className="flex items-center">
                                    <button
                                        className="bg-gray-300 text-black py-1 px-2 rounded-md mr-2"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        className="bg-gray-300 text-black py-1 px-2 rounded-md ml-2"
                                        onClick={() => addToCart(item)}
                                    >
                                        +
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No items in the cart</p>
                )}
            </div>

            {/* Payment Method Section */}
            <div className="mt-5">
                <h3 className="text-lg font-bold">Select Payment Method:</h3>
                <select
                    value={selectedPaymentMethod}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    className="p-2 border rounded-md w-full max-w-xs mt-2"
                >
                    <option value="">--Select Payment Method--</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Cash on Delivery">Cash on Delivery</option>
                </select>
                <button
                    className="bg-green-500 text-white py-2 px-4 rounded-md mt-3 mx-4"
                    onClick={handlePayment}
                >
                    Pay Now
                </button>
            </div>
        </div>
    );
};

export default MainContect;
