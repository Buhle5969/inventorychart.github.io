// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the HTML elements for the product form, product list, search input, and search button
    const productForm = document.getElementById('productForm'); // The form to add new products
    const productList = document.getElementById('productList'); // The list that displays products
    const searchInput = document.getElementById('search'); // Input field for searching products
    const searchButton = document.getElementById('searchButton'); // Button to trigger the search

    // Initialize products array from local storage or set it to an empty array if no products are found
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Function to display products in the product list
    function displayProducts(filter = '') {
        productList.innerHTML = ''; // Clear the product list to avoid duplicates
        products
            // Filter products based on the search input (case insensitive)
            .filter(product => product.name.toLowerCase().includes(filter.toLowerCase()))
            // Iterate over the filtered products to create list items
            .forEach((product, index) => {
                const li = document.createElement('li'); // Create a new list item for each product
                // Set the inner HTML of the list item to show product name and quantity with a remove button
                li.innerHTML = `${product.name} - ${product.quantity} 
                    <button onclick="removeProduct(${index})">Remove</button>`;
                productList.appendChild(li); // Append the list item to the product list
            });
    }

    // Event listener for the product form submission
    productForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        const productName = document.getElementById('productName').value.trim(); // Get product name and trim whitespace
        const productQuantity = parseInt(document.getElementById('productQuantity').value); // Get product quantity and convert to an integer

        // Validate the product name and quantity inputs
        if (productName === '' || productQuantity <= 0) {
            alert('Please enter a valid product name and quantity.'); // Alert the user if validation fails
            return; // Exit the function if validation fails
        }

        // Check for duplicate product names
        if (products.some(product => product.name === productName)) {
            alert('Product name must be unique.'); // Alert if the product name already exists
            return; // Exit the function if the product name is not unique
        }

        // Create a new product object with the entered name and quantity
        const product = {
            name: productName, // Set the product name
            quantity: productQuantity // Set the product quantity
        };

        // Add the new product to the products array
        products.push(product); // Push the new product into the products array
        // Save the updated products array to local storage
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts(); // Refresh the displayed product list
        productForm.reset(); // Reset the form fields for new input
    });

    // Function to remove a product based on its index in the array
    window.removeProduct = function(index) {
        products.splice(index, 1); // Remove the product from the array using its index
        // Update local storage with the new products array
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts(); // Refresh the displayed product list
    };

    // Event listener for the search button click
    searchButton.addEventListener('click', () => {
        displayProducts(searchInput.value); // Display products based on the current search input value
    });

    displayProducts(); // Initially display all products when the page loads
});

// Another DOMContentLoaded event to render charts
document.addEventListener('DOMContentLoaded', function () {
    // Inventory data for the bar chart
    const inventoryData = {
        labels: [ // Array of labels for the x-axis of the bar chart
            'Custom Website Design', 'E-commerce Development', 'SEO Optimization', 
            'Content Management Systems', 'Responsive Web Design', 'Mobile App Development', 
            'Website Maintenance', 'UX/UI Design', 'Web Hosting', 'Domain Registration', 
            'SSL Certificate Implementation', 'API Integration', 'Database Development', 
            'Custom Web Application Development', 'Website Redesign', 'Landing Page Design', 
            'Graphic Design Services', 'Logo Design', 'Social Media Integration', 'Email Marketing', 
            'Blog Development', 'Website Analytics', 'Website Speed Optimization', 
            'Security Audits', 'Backup and Restore Services', 'User Training and Support', 
            'Multilingual Website Development', 'Accessibility Compliance', 'Website Copywriting', 
            'Custom Forms Development', 'Online Booking Systems', 'Membership Website Development', 
            'Payment Gateway Integration', 'Forum/Community Site Development', 'Newsletter Setup', 
            'Photo and Video Gallery Creation', 'Virtual Tours and Interactive Maps', 
            'Online Survey and Feedback Tools', 'Event Calendar Integration', 
            'Chatbot Integration', 'Customer Portal Development', 'Affiliate Marketing Setup', 
            'Product Catalog Development', 'Order Management System', 
            'Inventory Management System', 'Project Management Tools', 'CRM Integration', 
            'Custom Plugin Development', 'Custom Theme Development', 
            'Online Course and LMS Development', 'Webinar Setup', 'FAQ Page Development', 
            'Knowledge Base Development', 'Directory Website Development', 
            'Real Estate Website Development', 'Job Board Website Development', 
            'Classified Ads Website Development', 'Travel Booking Website Development', 
            'Restaurant Website Development', 'Portfolio Website Development', 
            'Personal Blog Setup', 'Business Blog Setup', 'Government Website Development', 
            'NGO/Non-Profit Website Development', 'Education Website Development', 
            'Health and Fitness Website Development', 'News and Magazine Website Development', 
            'Entertainment Website Development', 'Fashion Website Development', 
            'Automotive Website Development', 'Music and Band Website Development', 
            'Photography Website Development', 'Wedding Website Development', 
            'Event Planning Website Development', 'Hotel and Hospitality Website Development', 
            'Consulting Website Development', 'Legal Services Website Development', 
            'Financial Services Website Development', 'Insurance Website Development', 
            'Real Estate IDX Integration', 'Auction Website Development', 
            'Crowdfunding Platform Development', 'SaaS Product Development', 
            'Marketplace Development', 'Multi-Vendor E-commerce Development', 
            'Coupon Website Development', 'Price Comparison Website Development', 
            'Job Application Portal Development', 'Freelance Marketplace Development', 
            'Donation Platform Development', 'Subscription Box Website Development', 
            'Online Magazine Development', 'Custom Dashboard Development', 
            'Interactive Infographic Creation', 'Podcast Website Development', 
            'Event Ticketing Website Development', 'Membership Subscription Website', 
            'Multi-Language Website Development'    
        ],

        datasets: [{ // Data set for the bar chart
            label: 'Quantities', // Label for the data set
            data: [ // Array of quantities corresponding to each label
                50, 30, 40, 25, 60, 20, 35, 45, 55, 50, 50, 25, 30, 15, 40, 45, 50, 40, 30, 25, 20, 35, 40, 30, 25, 20, 15, 10, 25, 30, 15, 10, 25, 10, 20, 15, 10, 20, 15, 20, 10, 15, 25, 20, 15, 10, 10, 20, 25, 10, 15, 25, 20, 15, 10, 10, 10, 5, 15, 25, 30, 20, 10, 15, 20, 10, 5, 10, 15, 10, 5, 10, 15, 10, 5, 20, 10, 15, 10, 5, 10, 5, 10, 5, 5, 10, 5, 10, 5, 10, 5, 10, 15, 20, 10, 5, 10, 5
            ],

            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Background color of the bars
            borderColor: 'rgba(75, 192, 192, 1)', // Border color of the bars
            borderWidth: 1 // Width of the border around the bars
        }]
    };                                                                                                                                                                                                                                                    

    // Configuration for the bar chart
    const config = {
        type: 'bar', // Specify the type of chart (bar chart)
        data: inventoryData, // Data for the chart
        options: { // Options to customize the chart
            scales: { // Configuration for the chart axes
                x: {
                    beginAtZero: true, // Start the x-axis at zero
                    ticks: {
                        autoSkip: false, // Do not skip ticks on the x-axis
                        maxRotation: 90, // Maximum rotation angle of the x-axis labels
                        minRotation: 60 // Minimum rotation angle of the x-axis labels
                    }
                },
                y: {
                    beginAtZero: true // Start the y-axis at zero
                }
            },
            responsive: true, // Make the chart responsive to window resizing
            plugins: { // Configuration for plugins (legend, tooltips, etc.)
                legend: {
                    position: 'top', // Position of the legend on the chart
                },
                tooltip: {
                    callbacks: { // Custom tooltip callbacks for formatting tooltips
                        label: function(context) {
                            let label = context.dataset.label || ''; // Get the dataset label
                            if (label) {
                                label += ': '; // Add a colon for better readability
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y; // Add the y-value to the label
                            }
                            return label; // Return the formatted label for the tooltip
                        }
                    }
                }
            }
        }
    };

    // Render the chart on the canvas
    const ctx = document.getElementById('inventoryChart').getContext('2d'); // Get the rendering context for the chart
    new Chart(ctx, config); // Create a new Chart instance with the specified configuration
});

// Data for the pie chart
const data = {
    labels: [ // Array of labels for the pie chart
        'Custom Website Design',
        'E-commerce Development',
        'SEO Optimization',
        'Content Management Systems',
        'Responsive Web Design',
        'Mobile App Development',
        'Website Maintenance',
        'UX/UI Design',
        'Web Hosting',
        'Domain Registration',
        'SSL Certificate Implementation',
        'API Integration',
        'Database Development',
        'Custom Web Application Development',
        'Website Redesign',
        'Landing Page Design',
        'Graphic Design Services',
        'Logo Design',
        'Social Media Integration',
        'Email Marketing',
        'Blog Development',
        'Website Analytics',
        'Website Speed Optimization',
        'Security Audits',
        'Backup and Restore Services',
        'User Training and Support',
        'Multilingual Website Development',
        'Accessibility Compliance',
        'Website Copywriting',
        'Custom Forms Development',
        'Online Booking Systems',
        'Membership Website Development',
        'Payment Gateway Integration',
        'Forum/Community Site Development',
        'Newsletter Setup',
        'Photo and Video Gallery Creation',
        'Virtual Tours and Interactive Maps',
        'Online Survey and Feedback Tools',
        'Event Calendar Integration',
        'Chatbot Integration',
        'Customer Portal Development',
        'Affiliate Marketing Setup',
        'Product Catalog Development',
        'Order Management System',
        'Inventory Management System',
        'Project Management Tools',
        'CRM Integration',
        'Custom Plugin Development',
        'Custom Theme Development',
        'Online Course and LMS Development',
        'Webinar Setup',
        'FAQ Page Development',
        'Knowledge Base Development',
        'Directory Website Development',
        'Real Estate Website Development',
        'Job Board Website Development',
        'Classified Ads Website Development',
        'Travel Booking Website Development',
        'Restaurant Website Development',
        'Portfolio Website Development',
        'Personal Blog Setup',
        'Business Blog Setup',
        'Government Website Development',
        'NGO/Non-Profit Website Development',
        'Education Website Development',
        'Health and Fitness Website Development',
        'News and Magazine Website Development',
        'Entertainment Website Development',
        'Fashion Website Development',
        'Automotive Website Development',
        'Music and Band Website Development',
        'Photography Website Development',
        'Wedding Website Development',
        'Event Planning Website Development',
        'Hotel and Hospitality Website Development',
        'Consulting Website Development',
        'Legal Services Website Development',
        'Financial Services Website Development',
        'Insurance Website Development',
        'Real Estate IDX Integration',
        'Auction Website Development',
        'Crowdfunding Platform Development',
        'SaaS Product Development',
        'Marketplace Development',
        'Multi-Vendor E-commerce Development',
        'Coupon Website Development',
        'Price Comparison Website Development',
        'Job Application Portal Development',
        'Freelance Marketplace Development',
        'Donation Platform Development',
        'Subscription Box Website Development',
        'Online Magazine Development',
        'Custom Dashboard Development',
        'Interactive Infographic Creation',
        'Podcast Website Development',
        'Event Ticketing Website Development',
        'Membership Subscription Website',
        'Multi-Language Website Development'
    ],
    datasets: [{ // Data set for the pie chart
        label: 'Service Quantities', // Label for the data set
        data: [ // Array of quantities for each label in the pie chart
            50, 30, 40, 25, 60, 20, 35, 45, 55, 50, 50, 25, 30, 15, 40, 45, 50, 40, 30, 25, 20, 35, 40, 30, 25,
            20, 15, 10, 25, 30, 15, 10, 25, 30, 15, 20, 10, 5, 15, 25, 30, 15, 10, 5, 10, 5, 10, 10, 5, 10, 5, 10,
            15, 10, 10, 10, 10, 5, 15, 30, 20, 10, 15, 10, 5, 15, 10, 10, 5, 10, 5, 10, 5, 10, 15, 10, 5, 10, 15,
            10, 10, 20, 5
        ],
        backgroundColor: [ // Array of background colors for each segment of the pie chart
            '#FF6384', '#36A2EB', '#FFCE56', '#E7E9ED', '#4BC0C0', '#9966FF', 
            '#FF9F40', '#FF5722', '#795548', '#607D8B', '#9E9E9E', '#FFC107', 
            '#03A9F4', '#8BC34A', '#FFEB3B', '#FF9800', '#9C27B0', '#3F51B5', 
            '#4CAF50', '#FF5722', '#FFC107', '#8BC34A', '#FF9800', '#03A9F4', 
            '#FFEB3B', '#9E9E9E', '#795548', '#607D8B', '#3F51B5', '#9C27B0', 
            '#FF5722', '#4CAF50', '#8BC34A', '#FF9800', '#03A9F4', '#FFC107', 
            '#FFEB3B', '#FF9800', '#FF5722', '#FFEB3B', '#9E9E9E', '#3F51B5', 
            '#8BC34A', '#4CAF50', '#9C27B0', '#FF9800', '#03A9F4', '#FFEB3B', 
            '#FF9800', '#FF5722', '#FFEB3B', '#FF9800', '#4CAF50', '#9E9E9E', 
            '#FFC107', '#3F51B5', '#8BC34A', '#FF9800', '#FFEB3B', '#9C27B0', 
            '#4CAF50', '#FF9800', '#FFEB3B', '#FF5722'
        ],
        hoverOffset: 4 // Offset for hover effect on the pie chart segments
    }]
};

// Create the pie chart on the canvas
const ctx = document.getElementById('myPieChart').getContext('2d'); // Get the rendering context for the pie chart
const myPieChart = new Chart(ctx, { // Create a new Chart instance for the pie chart
    type: 'pie', // Specify the type of chart (pie chart)
    data: data, // Data for the pie chart
    options: { // Options to customize the pie chart
        responsive: true, // Make the chart responsive to window resizing
        plugins: { // Configuration for plugins (legend, tooltips, etc.)
            legend: {
                position: 'top', // Position of the legend on the chart
            },
            tooltip: {
                callbacks: { // Custom tooltip callbacks for formatting tooltips
                    label: function(tooltipItem) {
                        return tooltipItem.label + ': ' + tooltipItem.raw; // Return label and raw data for tooltip
                    }
                }
            }
        }
    }
});
