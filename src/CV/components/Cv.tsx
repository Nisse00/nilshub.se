import { useState, useEffect } from 'react';

export default function Cv() {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    
    useEffect(() => {
        // Attempt to load the PDF from the public directory
        const pdfPath = "/CV.pdf"; // Assuming the PDF is in the public folder
        
        // Check if the file exists
        fetch(pdfPath)
            .then(response => {
                if (response.ok) {
                    setPdfUrl(pdfPath);
                } else {
                    console.error('CV PDF not found');
                }
            })
            .catch(error => {
                console.error('Error loading CV PDF:', error);
            });
    }, []);

    return (
        <div className="cv-container">
            {pdfUrl ? (
                <object
                    data={pdfUrl}
                    type="application/pdf"
                    width="100%"
                    height="800px"
                    style={{ border: 'none' }}
                >
                    <p>
                        It appears your browser doesn't support embedded PDFs.
                        You can <a href={pdfUrl} target="_blank" rel="noopener noreferrer">download the CV</a> instead.
                    </p>
                </object>
            ) : (
                <div>
                    <h1>Loading CV...</h1>
                </div>
            )}
        </div>
    );
}