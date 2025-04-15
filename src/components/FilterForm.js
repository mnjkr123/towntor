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

              <div className="col-lg-3 col-md-6 col-12 px-2">
                <div className="mb-lg-0 mb-3">
                  <div className="filter-search-form position-relative filter-border bg-light">
                    <div className="flex flex-col items-center">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Maximum Price
                      </label>
                      <Select
                        className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                        options={price}
                        onChange={(selectedOption) => handleChange(selectedOption, 'maxPrice')}
                        value={formData.maxPrice}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row g-lg-0 mt-3">
              <div className="col-lg-3 col-md-6 col-12 px-2">
                <div className="mb-lg-0 mb-3">
                  <div className="filter-search-form position-relative filter-border bg-light">
                    <div className="flex flex-col items-center">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        House Type
                      </label>
                      <Select
                        className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                        options={houseTypes}
                        onChange={(selectedOption) => handleChange(selectedOption, 'houseType')}
                        value={formData.houseType}
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
                        Number of Bedrooms
                      </label>
                      <Select
                        className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                        options={bedrooms}
                        onChange={(selectedOption) => handleChange(selectedOption, 'bedrooms')}
                        value={formData.bedrooms}
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
                        Number of Bathrooms
                      </label>
                      <Select
                        className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                        options={bathrooms}
                        onChange={(selectedOption) => handleChange(selectedOption, 'bathrooms')}
                        value={formData.bathrooms}
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
                        Parking Availability
                      </label>
                      <Select
                        className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                        options={parking}
                        onChange={(selectedOption) => handleChange(selectedOption, 'parking')}
                        value={formData.parking}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3 - Additional Filters */}
            <div className="row g-lg-0 mt-3">
              <div className="col-lg-3 col-md-6 col-12 px-2">
                <div className="mb-lg-0 mb-3">
                  <div className="filter-search-form position-relative filter-border bg-light">
                    <div className="flex flex-col items-center">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Year Built
                      </label>
                      <Select
                        className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                        options={yearBuilt}
                        onChange={(selectedOption) => handleChange(selectedOption, 'yearBuilt')}
                        value={formData.yearBuilt}
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
                        Plot Size (sqft)
                      </label>
                      <Select
                        className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                        options={plotSizes}
                        onChange={(selectedOption) => handleChange(selectedOption, 'plotSize')}
                        value={formData.plotSize}
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
                        Near by
                      </label>
                      <Select
                        className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                        options={nearBy}
                        onChange={(selectedOption) => handleChange(selectedOption, 'nearBy')}
                        value={formData.nearBy}
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
                        Interior Design
                      </label>
                      <Select
                        className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                        options={interiorDesigns}
                        onChange={(selectedOption) => handleChange(selectedOption, 'interiorDesign')}
                        value={formData.interiorDesign}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 4 - Additional Filters */}
            <div className="row g-lg-0 mt-3">
              <div className="col-lg-3 col-md-6 col-12 px-2">
                <div className="mb-lg-0 mb-3">
                  <div className="filter-search-form position-relative filter-border bg-light">
                    <div className="flex flex-col items-center">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Facing
                      </label>
                      <Select
                        className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                        options={facings}
                        onChange={(selectedOption) => handleChange(selectedOption, 'facing')}
                        value={formData.facing}
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
                        Additional Features
                      </label>
                      <Select
                        className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                        options={additionalFeatures}
                        onChange={(selectedOption) => handleChange(selectedOption, 'additionalFeatures')}
                        value={formData.additionalFeatures}
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