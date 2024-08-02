
document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const productList = document.getElementById('productList');
    const searchInput = document.getElementById('search');
    const searchButton = document.getElementById('searchButton');
    
    // Initialize products from local storage
    let products = JSON.parse(localStorage.getItem('products')) || [];

    function displayProducts(filter = '') {
        productList.innerHTML = '';
        products
            .filter(product => product.name.toLowerCase().includes(filter.toLowerCase()))
            .forEach((product, index) => {
                const li = document.createElement('li');
                li.innerHTML = `${product.name} - ${product.quantity} 
                    <button onclick="removeProduct(${index})">Remove</button>`;
                productList.appendChild(li);
            });
    }

    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const productName = document.getElementById('productName').value.trim();
        const productQuantity = parseInt(document.getElementById('productQuantity').value);

        if (productName === '' || productQuantity <= 0) {
            alert('Please enter a valid product name and quantity.');
            return;
        }

        if (products.some(product => product.name === productName)) {
            alert('Product name must be unique.');
            return;
        }

        const product = {
            name: productName,
            quantity: productQuantity
        };

        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
        productForm.reset();
    });

    window.removeProduct = function(index) {
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
    };

    searchButton.addEventListener('click', () => {
        displayProducts(searchInput.value);
    });

    displayProducts();
});



document.addEventListener('DOMContentLoaded', function () {
    // Inventory data
    const inventoryData = {
        labels: [
            'Custom Website Design', 'E-commerce Development', 'SEO Optimizatio', 'Content Management Systems', 'Responsive Web Design', 'Mobile App Development', 
'Website Maintenance', 'UX/UI Design', 'Web Hosting', 'Domain Registration', 'SSL Certificate Implementation', 'API Integration', 'Database Development', 
'Custom Web Application Development', 'Website Redesign', 'Landing Page Design', 'Graphic Design Services', 'Logo Design', 'Social Media Integration', 'Email Marketing', 
'Blog Development', 'Website Analytics', 'Website Speed Optimization', 'Security Audits', 'Backup and Restore Services', 'User Training and Support', 
'Multilingual Website Development', 'Accessibility Compliance', 'Website Copywriting', 'Custom Forms Development', 'Online Booking Systems', 
'Membership Website Development', 'Payment Gateway Integration', 'Forum/Community Site Development', 'Newsletter Setup', 'Photo and Video Gallery Creation', 
'Virtual Tours and Interactive Maps', 'Online Survey and Feedback Tools', 'Event Calendar Integration', 'Chatbot Integration', 'Customer Portal Development',
'Affiliate Marketing Setup', 'Product Catalog Development', 'Order Management System', 'Inventory Management System', 'Project Management Tools', 'CRM Integration', 
'Custom Plugin Development', 'Custom Theme Development', 'Online Course and LMS Development', 'Webinar Setup', 'FAQ Page Development', 'Knowledge Base Development', 
'Directory Website Development', 'Real Estate Website Development', 'Job Board Website Development', 'Classified Ads Website Development', 
'Travel Booking Website Development', 'Restaurant Website Development', 'Portfolio Website Development', 'Personal Blog Setup', 'Business Blog Setup',                      
'Government Website Development', 'NGO/Non-Profit Website Development', 'Education Website Development', 'Health and Fitness Website Development', 
'News and Magazine Website Development', 'Entertainment Website Development', 'Fashion Website Development', 'Automotive Website Development',
'Music and Band Website Development', 'Photography Website Development', 'Wedding Website Development', 'Event Planning Website Development', 
'Hotel and Hospitality Website Development', 'Consulting Website Development', 'Legal Services Website Development', 'Financial Services Website Development', 
'Insurance Website Development', 'Real Estate IDX Integration', 'Auction Website Development', 'Crowdfunding Platform Development', 'SaaS Product Development', 
'Marketplace Development', 'Multi-Vendor E-commerce Development', 'Coupon Website Development', 'Price Comparison Website Development', 
'Job Application Portal Development', 'Freelance Marketplace Development', 'Donation Platform Development', 'Subscription Box Website Development', 
'Online Magazine Development', 'Custom Dashboard Development', 'Interactive Infographic Creation', 'Podcast Website Development', 'Event Ticketing Website Development', 
'Membership Subscription Website', 'Multi-Language Website Development'    
        ],

        datasets: [{
            label: 'Quantities',
            data: [
                50, 30, 40, 25, 60, 20, 35, 45, 55, 50, 50, 25, 30, 15, 40, 45, 50, 40, 30, 25, 20, 35, 40, 30, 25, 20, 15, 10, 25, 30, 15, 10, 25, 10, 20, 15, 10, 20, 15, 
                20, 10, 15, 25, 20, 15, 10, 10, 20, 25, 10, 15, 25, 20, 15, 10, 10, 10, 5, 15, 25, 30, 20, 10, 15, 20, 10, 5, 10, 15, 10, 5, 10, 15, 10, 5, 20, 10, 15, 10, 5,
                10, 5, 10, 5, 5, 10, 5, 10, 5, 10, 5, 10, 15, 20, 10, 5, 10, 5
            ],

            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    }                                                                                                                                                                                                                                                    
    // Configuration for the bar chart
    const config = {
        type: 'bar',
        data: inventoryData,
        options: {
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        autoSkip: false,
                        maxRotation: 90,
                        minRotation: 60
                    }
                },
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y;
                            }
                            return label;
                        }
                    }
                }
            }
        }
    };

    // Render the chart
    const ctx = document.getElementById('inventoryChart').getContext('2d');
    new Chart(ctx, config);
});

