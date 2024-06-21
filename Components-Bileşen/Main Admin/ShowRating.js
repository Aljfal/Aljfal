import React, { useState, useEffect } from "react";

const ShowRating = ({ onChange, initialRating, className }) => {
    // This state keeps track of the current rating
    const [rating, setRating] = useState(initialRating || 0);

    // Effect to call the onChange function whenever the rating changes
    useEffect(() => {
        ;
    }, []);
    // Function to handle the star click
    const handleStarClick = (index) => {
        setRating(index + 1); // Set rating to the index of the clicked star (1-based)
    };

    return (
        <div className={`flex ${className}`}>
            {/* Render stars based on the current rating */}
            {[...Array(5)].map((_, index) => (
                <svg
                    key={index}
                    className={`w-6 h-6 cursor-pointer ${
                        index < rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    onClick={() => handleStarClick(index)}
                >
                    <path
                        d="M9.049 2.927a1 1 0 011.902 0l1.794 5.526a1 1 0 00.946.691h5.848a1 1 0 01.564 1.81l-4.727 3.437a1 1 0 00-.364 1.118l1.794 5.526a1 1 0 01-1.537 1.118l-4.727-3.437a1 1 0 00-1.172 0l-4.727 3.437a1 1 0 01-1.537-1.118l1.794-5.526a1 1 0 00-.364-1.118l-4.727-3.437a1 1 0 01.564-1.81h5.848a1 1 0 00.946-.691l1.794-5.526z"
                    />
                </svg>
            ))}
        </div>
    );
};

export default ShowRating;
