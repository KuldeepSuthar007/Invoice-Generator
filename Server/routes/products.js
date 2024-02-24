const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const backendUrl = "http://localhost:8080/api"
const verifyAuth = require('../middleware/verifyAuth')

router.get('/download-pdf', (req, res) => {
    try {
        const pdfPath = path.join(uploadDirectory, 'invoice.pdf');

        // Set response headers for PDF
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="invoice.pdf"');

        // Pipe the saved PDF file to response
        fs.createReadStream(pdfPath).pipe(res);
    } catch (error) {
        console.error('Error downloading PDF:', error);
        res.status(500).json({ error: 'Failed to download PDF' });
    }
});


const path = require('path');

const uploadDirectory = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}


router.post('/generate-pdf', verifyAuth, async (req, res) => {
    try {


        const { products, user } = req.body;

        const doc = new PDFDocument();


        // Add content to PDF document
        doc.fontSize(20);
        doc.text('Invoice Generator                                    Levitation', { align: 'left' });

        const docWidth = doc.page.width;


        doc.text('Infotech', { align: 'right', width: docWidth - 180 });

        doc.fontSize(16).text("  Product                 Qty                 Rate                 Total", { align: 'left' });


        let totalAmount = 0;
        products.forEach((product, index) => {

            const productX = 80;
            const qtyX = 230;
            const rateX = 330;
            const totalX = 430;
            const y = 150 + index * 30;
            const productTotal = product.qty * product.rate;
            totalAmount += productTotal;

            doc.fontSize(16).text(`${product.name}`, productX, y);
            doc.text(product.qty.toString(), qtyX, y);
            doc.text(product.rate.toString(), rateX, y);
            doc.text((product.qty * product.rate).toString(), totalX, y);
        });


        const gstRate = 0.18;
        const gstAmount = totalAmount * gstRate;
        const grandTotal = totalAmount + gstAmount;
        const rightAlignedX = docWidth - 250;


        doc.fontSize(18).text(`Total: INR${totalAmount.toFixed(2)}`, rightAlignedX);
        doc.moveDown();

        doc.fontSize(18).text(`GST  18%`, rightAlignedX);
        doc.moveDown();

        doc.fontSize(18).text(`Grand Total: ${grandTotal.toFixed(2)}`, rightAlignedX);
        doc.moveDown();

        const leftAlignedX = 200;


        doc.fontSize(16).text("Valid until: 12/04/24", leftAlignedX);
        doc.moveDown();
        doc.moveDown();
        doc.fontSize(16).text("");



        const centerX = doc.page.width / 2;
        const centerY = doc.page.height / 2;

        const buttonWidth = 450;
        const buttonHeight = 60;
        const borderRadius = 10;
        const buttonBackgroundColor = 'darkblack';
        const textColor = 'white';


        const textX = centerX - buttonWidth / 2;
        const textY = centerY - buttonHeight / 2;


        doc.rect(textX, textY, buttonWidth, buttonHeight)
            .fill(buttonBackgroundColor)
            .stroke();


        doc.fillColor(textColor)
            .fontSize(14);


        doc.text('Terms & Conditions we are happy to supply any furthur information you may need and trust that you call on us to fill your order  which will receive our prompt and careful attention', textX, textY, {
            width: buttonWidth,
            height: buttonHeight,
            align: 'center',
            valign: 'center'
        });

        const pdfPath = path.join(uploadDirectory, 'invoice.pdf');
        doc.pipe(fs.createWriteStream(pdfPath));
        doc.end();



        for (const product of products) {
            const newProduct = new Product({
                name: product.name,
                quantity: product.qty,
                rate: product.rate,
                userId: user,
                date: new Date()
            });
            await newProduct.save();
        }


        const pdfUrl = `${backendUrl}/product/download-pdf`;
        res.json({ pdfUrl });


    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ error: 'Failed to generate PDF' });
    }
});



module.exports = router;


