import React from 'react';
import Select from 'react-select';
import { categories, price, houseTypes, bedrooms, bathrooms, parking, yearBuilt, plotSizes, nearBy, interiorDesigns, facings, additionalFeatures } from '../data/filterData';

const FilterForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <div className='form-container'>
        <form className="card-body text-start w-150" onSubmit={handleSubmit}>
          <div className="registration-form text-dark text-start">
            <div className="row g-lg-0 mt-3">
              <div className="col-lg-3 col-md-6 col-12 px-2">
                <div className="mb-lg-0 mb-3">
                  <div className="filter-search-form position-relative filter-border bg-light">
                    <div className="flex flex-col items-center">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Categories
                      </label>
                      <Select
                        className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                        options={categories}
                        onChange={(selectedOption) => handleChange(selectedOption, 'categories')}
                        value={formData.categories}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-12 px-2">
                <div className="mb-lg-0 mb-3">
                  <div className="filter-search-form position-relative filter-border bg-light">
                    <div className="flex flex-col items-center">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Minimum Price
                      </label>
                      <Select
                        className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                        options={price}
                        onChange={(selectedOption) => handleChange(selectedOption, 'minPrice')}
                        value={formData.minPrice}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
    </div>
  );
};

export default FilterForm;