import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AddProductPage = ({ onNext }) => {
    const navigate = useNavigate();

    const [products, setProducts] = useState(() => {
        const storedProducts = localStorage.getItem('products');
        return storedProducts ? JSON.parse(storedProducts) : [{ name: '', qty: 0, rate: 0 }];
    });


    const handleProductChange = (index, field, value) => {
        const updatedProducts = [...products];
        updatedProducts[index][field] = value;
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    };


    const handleAddProduct = () => {
        const newProduct = { name: '', qty: 0, rate: 0 };
        setProducts([...products, newProduct]);
        localStorage.setItem('products', JSON.stringify([...products, newProduct]));
    };


    const handleRemoveProduct = (index) => {
        const updatedProducts = [...products];
        updatedProducts.splice(index, 1);
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    };


    const calculateProductTotal = (qty, rate) => {
        return qty * rate;
    };


    const calculateProductGST = (total) => {
        return total * 0.18;
    };


    const handleNext = () => {
        navigate('/generate');
    };

    return (
        <div className='flex justify-center flex-col' >
            <p className='text-center font-sans normal-case text-3xl font-bold text-gray-900 mb-4'>Add Product</p>
            {products.map((product, index) => (
                <div key={index}>
                    <div className="flex flex-wrap justify-start items-center">
                        <input
                            className=" m-3 border border-gray-300 p-2 rounded-md outline-none focus:border-blue-500"
                            type="text"
                            placeholder="Product Name"
                            value={product.name}
                            onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                        />
                        <input
                            className="m-3 border border-gray-300 p-2 rounded-md outline-none focus:border-blue-500"
                            type="number"
                            placeholder="Product Qty"
                            value={product.qty}
                            onChange={(e) => handleProductChange(index, 'qty', parseInt(e.target.value))}
                        />
                        <input
                            className="m-3 border border-gray-300 p-2 rounded-md outline-none focus:border-blue-500"
                            type="number"
                            placeholder="Product Rate"
                            value={product.rate}
                            onChange={(e) => handleProductChange(index, 'rate', parseFloat(e.target.value))}
                        />
                        <div>
                            <button className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mx-2" onClick={handleAddProduct}>Add Product</button>
                        </div>
                        <div>
                            <button className=' text-sm text-white font-bold px-4 py-2 border bg-red-500 border-red-500 rounded hover:bg-red-500 ' onClick={() => handleRemoveProduct(index)}>Remove</button>
                        </div>

                        <p className='text-left font-sans normal-case text-xl font-bold text-gray-900 mb-4 mx-3'> Total: {calculateProductTotal(product.qty, product.rate)}</p>
                        <p className='text-left font-sans normal-case text-xl font-bold text-gray-900 mb-4 mx-3'>  GST: {calculateProductGST(calculateProductTotal(product.qty, product.rate))}</p>

                    </div>
                </div>
            ))}
            <div className='flex justify-end items-center px-4' >
                <div >
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  mx-2 rounded" onClick={handleNext}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default AddProductPage;
