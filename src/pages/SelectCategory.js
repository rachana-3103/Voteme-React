import React from 'react';

const SelectCategory = () => {
    return (
        <div>
            <section className="select-cat-page">
                <div className="select-cat-inner">
                    <div className="select-category">
                        <h2 className="section-title">What are your interests?</h2>
                        <div className="category-cover">
                            <div className="category-list" style={{ backgroundImage: `url("assets/images/World of knowladge.jpg")` }}>
                                <input type="checkbox" name="Select Category" />
                                <label><span>World of knowladge</span></label>
                            </div>
                            <div className="category-list" style={{ backgroundImage: `url("assets/images/Math & Science.jpg")` }}>
                                <input type="checkbox" name="Select Category" />
                                <label><span>World of knowladge</span></label>
                            </div><div className="category-list" style={{ backgroundImage: `url("assets/images/World of knowladge.jpg")` }}>
                                <input type="checkbox" name="Select Category" />
                                <label><span>World of knowladge</span></label>
                            </div><div className="category-list" style={{ backgroundImage: `url("assets/images/World of knowladge.jpg")` }}>
                                <input type="checkbox" name="Select Category" />
                                <label><span>World of knowladge</span></label>
                            </div><div className="category-list" style={{ backgroundImage: `url("assets/images/World of knowladge.jpg")` }}>
                                <input type="checkbox" name="Select Category" />
                                <label><span>World of knowladge</span></label>
                            </div>
                        </div>
                    </div>
                    <div className="submit-btn">
                        <button type="button">Save</button>
                    </div>
                </div>
            </section> </div >
    );
}

export default SelectCategory;
