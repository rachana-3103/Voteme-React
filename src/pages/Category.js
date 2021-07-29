import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthData } from '../helper/AuthData';

const Category = () => {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        loadCategory();
    }, []);

    const loadCategory = async () => {
        const userInfo = AuthData();
        const result = await axios.get(`http://localhost:3000/voteme/category`, { headers: userInfo.header });
        setCategory(result.data.Data);
    }

    return (
        <div>
            <div className="categories-blocks">
                <div className="categories-added-list container">
                    <div className="d-flex">
                        {category.map((e) => (
                            <div className="header-cat-list" key={e.CategoryName}>
                                <img src="assets/images/Astrogoy_200x200.jpg" alt="" />
                                <span className="cat-title">{e.CategoryName}</span>
                            </div>
                        ))}

                    </div>
                    <div className="header-cat-list add-cat-btn">
                        <button className="add-more" type="button"><span>+</span>Add Categories</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Category;
