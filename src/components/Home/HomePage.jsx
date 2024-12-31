import { useState, useEffect } from 'react';

const HomePage = () => {
    const [token, setToken] = useState('');
    const [qrCodeUrl, setQrCodeUrl] = useState(null);
    const [QrColor,setQrColor] = useState("bg-white")

    const colorCode = ["bg-red-500", "bg-blue-500", "bg-yellow-500", "bg-green-500"];

    // Generate a random token
    const generateToken = () => {
        const randomToken = Math.random().toString(36).substring(2, 15); // Generate a random token
        setToken(randomToken); // Set the new token
    };

    // Fetch the QR code URL from the backend using the token
    useEffect(() => {
        const fetchQrCode = async () => {
            if (!token) return; // Do nothing if token is not available
            try {
                const response = await fetch(`http://localhost:3000/api/actions?token=${token}`);
                if (response.ok) {
                    const result = await response.json();
                    setQrCodeUrl(result.qrCode); // Set the new QR code URL
                } else {
                    console.error('Failed to fetch QR code.');
                }
            } catch (error) {
                console.error('Error fetching QR code:', error);
            }
        };

        fetchQrCode();
    }, [token]); // Dependency array updated to watch token

    return (
        <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-4xl font-semibold mb-6">Welcome to the Home Page!</h1>
            
            <div className="mb-6">
                <button 
                    onClick={generateToken} 
                    className="bg-blue-500 text-white p-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300">
                    Generate Token
                </button>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-medium">Generated Token:</h2>
                <p className="text-lg">{token}</p>
            </div>

            <div className="flex justify-between">
                <div>
                    <h2 className="text-xl font-medium p-2">QR Code:</h2>
                    {qrCodeUrl ? (
                        <div className={`${QrColor} p-0.5 rounded-lg`}>
                            <img src={qrCodeUrl} alt="QR Code" className="w-48 bg-blue-200 mx-auto rounded-lg shadow-lg" />
                        </div>
                    ) : (
                        <p>Loading QR code...</p>
                    )}
                </div>
                
                <div className=' flex-1 py-16 px-2 justify-center items-center'>
                    {colorCode.map((color, index) => (
                        <div key={index} onClick={()=>setQrColor(color)} className={`${color} p-3 rounded-lg m-2`}></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
