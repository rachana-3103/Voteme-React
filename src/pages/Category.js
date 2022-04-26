import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthData } from '../helper/AuthData';

const Category = () => {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        loadCategory();
    }, []);

    const loadCategory = async () => {
        const userInfo = AuthData();
        const user = await axios.get(`http://localhost:8080/voteme/${userInfo.id}/profile`, { headers: userInfo.header });
        const category = await axios.get(`http://localhost:8080/voteme/category`, { headers: userInfo.header });
        const categoryArray = [];
        const selectedCategoryId = user.data.Data.Category.map(categoryId => categoryId);
        category.data.Data.forEach(category => {
            if (selectedCategoryId.includes(category._id)) {
                categoryArray.push(category);
            }
        });
        setCategory(categoryArray);
    }

    return (
        <div>
            <div className="categories-blocks">
                <div className="categories-added-list container">
                    <div className="d-flex">
                        {category.map((e) => (
                            <div className="header-cat-list" key={e.CategoryName} >
                                <img src={e.Image} alt="" style={{ height: '80px' }} />
                                <span className="cat-title"><b>{e.CategoryName}</b></span>
                            </div>
                        ))}
                    </div>
                    <div className="header-cat-list add-cat-btn">
                        <Link to='/addCategory'>
                            <button className="add-more" type="button"><span>+</span>Add Categories</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Category;
