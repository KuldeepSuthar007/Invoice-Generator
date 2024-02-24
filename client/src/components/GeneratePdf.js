import React, { useState, useEffect } from 'react'
import axios from 'axios';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

function GeneratePdf() {

    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [products, setProducts] = useState([]);

    const generatePDF = async () => {
        setIsLoading(true);

        try {
            const token = await localStorage.getItem("token");
            const userId = await localStorage.getItem("user_id");
            const response = await axios.post(`${backendUrl}product/generate-pdf`, {
                products: products,
                user: userId,
                date: new Date()
            }, {
                headers: { token: token },
            }, {
                responseType: 'blob'
            });
            setSuccessMessage('PDF generated successfully! please download');


        } catch (error) {
            console.error('Error generating PDF:', error);
            setErrorMessage("Something went wrong! please try again")
        }
        setIsLoading(false);
    };

    const downloadPDF = async () => {
        try {

            const pdfUrl = `${backendUrl}product/download-pdf`;
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.setAttribute('download', 'invoice.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };

    useEffect(() => {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        }
    }, []);

    return (
        <div className="container mx-auto mt-8">
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold">Generate PDF</h1>
                <p className="text-gray-600">Create custom PDF documents with ease</p>
            </header>

            <div className="flex justify-center mb-8">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mr-4" onClick={generatePDF} disabled={isLoading}>
                    {isLoading ? 'Generating PDF...' : 'Generate PDF'}
                </button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded" onClick={downloadPDF} disabled={isLoading}>
                    Download PDF
                </button>
            </div>
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">Preview</h3>
                <div className="border border-gray-300 p-4 rounded-md">
                    <h4 className="text-md font-semibold mb-2">Product Summary</h4>
                    <ul className="list-disc ml-8">
                        {products.map((product, index) => (
                            <li key={index}>
                                {product.name} - Qty: {product.qty}, Rate: {product.rate}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
            {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
            <div className="text-center">
                <h2 className="text-lg font-semibold mb-2">Need Help?</h2>
                <p className="text-gray-600">Check out our <a href="#" className="text-blue-500 hover:underline">FAQ</a> or <a href="#" className="text-blue-500 hover:underline">contact us</a></p>
            </div>
        </div>
    )
}

export default GeneratePdf