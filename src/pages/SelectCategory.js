import React, { useEffect, useState } from 'react';
import { AuthData } from '../helper/AuthData';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const SelectCategory = () => {
    const navigate = useNavigate();
    const userInfo = AuthData();
    const [category, setCategory] = useState([]);
    const [userCategory, setUserCategory] = useState([]);

    useEffect(() => {
        loadCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadCategory = async () => {
        const result = await axios.get(`http://localhost:8080/voteme/category`, { headers: userInfo.header });
        const categoryArray = [];
        const user = await axios.get(`http://localhost:8080/voteme/${userInfo.id}/profile`, { headers: userInfo.header });
        const selectedCategoryId = user.data.Data.Category.map(categoryId => categoryId);
        result.data.Data.forEach(category => {
            if (selectedCategoryId.includes(category._id)) {
                categoryArray.push(category._id);
            }
        });
        setUserCategory(categoryArray);
        setCategory(result.data.Data);
    }

    const updateCategory = async (e) => {
        if (userCategory.includes(e.target.value)) {
            userCategory.splice(userCategory.indexOf(e.target.value), 1);
        } else {
            userCategory.push(e.target.value);
        }
        setUserCategory(userCategory);
    }
    const submit = async (e) => {
        e.preventDefault();
        const body = { Category: userCategory };
        await axios.put(`http://localhost:8080/voteme/updateusercategory`, body, { headers: userInfo.header });
        navigate("/home");
    }

    return (
        <div>
            <section className="select-cat-page">
                <div className="select-cat-inner">
                    <div className="select-category">
                        <h2 className="section-title">What are your interests?</h2>

                        <form onSubmit={e => submit(e)}>
                            <div className="category-cover" style={{
                                display: 'grid', gridTemplateColumns: 'auto auto auto auto',
                            }}>
                                {category.map((e) => (
                                    <div className="category-list" style={{ backgroundImage: `url(${e.Image})`, width: '107px', height: '100px' }}>
                                        <input type="checkbox" name='category' value={e._id} defaultChecked={userCategory.includes(e._id)} onChange={(e) => updateCategory(e)} />
                                        <label> <span style={{ fontSize: '12px' }}>{e.CategoryName}</span></label>
                                    </div>
                                ))}
                            </div>
                            <div className="submit-btn">
                                <button type="submit">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section> </div >
    );
}

export default SelectCategory;
