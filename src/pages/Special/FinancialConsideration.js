import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, CheckCircle } from 'lucide-react';
import '../../asset/css/FinancialConsideration.css';  // Add this at the top of the component file


const FinancialConsideration = () => {
  const [activeSection, setActiveSection] = useState("Budget and Affordability");
  const [expandedSections, setExpandedSections] = useState({
    "Budget and Affordability": true
  });
  const [selectedSubSection, setSelectedSubSection] = useState(null);
  const [formData, setFormData] = useState({});
  const [report, setReport] = useState("");
  const [sectionCompletion, setSectionCompletion] = useState({});

  // Descriptions for subsections that appear when clicked
  const subSectionDescriptions = {
    "Maximum budget": "Enter the highest amount you're willing to spend on your new home. Consider your savings, income, and financial goals to determine a comfortable budget.",
    "Monthly income": "Enter your total household income after taxes. This helps determine what you can afford for monthly housing payments.",
    "Expected monthly housing cost": "Include your expected mortgage payment, property taxes, insurance, and any HOA fees in this estimate.",
    "Estimated moving costs": "Consider expenses for professional movers, rental trucks, packing supplies, and other relocation expenses.",
    "Furniture & renovation expenses": "Budget for immediate furniture purchases and any renovations you plan to make after moving in.",
    "Emergency fund amount": "Experts recommend having 3-6 months of expenses saved for emergencies, separate from your down payment.",
    
    "Pre-approved loan amount": "The amount your lender has pre-approved you for based on your financial situation and credit history.",
    "Credit score": "Your current credit score affects the interest rates you qualify for. Higher scores typically result in better rates.",
    "Interest rate offered": "The annual interest rate offered by your lender. Even small differences can significantly impact your monthly payment.",
    "Loan term in years": "The length of your mortgage loan, typically 15 or 30 years. Shorter terms have higher payments but lower total interest.",
    "Estimated monthly EMI": "Your estimated Equated Monthly Installment, including principal and interest payments.",
    "Type of mortgage": "Common types include Fixed-Rate, Adjustable-Rate (ARM), FHA, VA, or USDA loans.",
    
  };

  // Define sections with their respective input fields
  const sections = [
    {
      title: "Budget and Affordability",
      items: [
        { name: "Maximum budget", type: "currency" },
        { name: "Monthly income", type: "currency" },
        { name: "Expected monthly housing cost", type: "currency" },
        { name: "Estimated moving costs", type: "currency" },
        { name: "Furniture & renovation expenses", type: "currency" },
        { name: "Emergency fund amount", type: "currency" },
      ],
    },
    {
      title: "Loan Details",
      items: [
        { name: "Pre-approved loan amount", type: "currency" },
        { name: "Credit score", type: "number" },
        { name: "Interest rate offered", type: "percentage" },
        { name: "Loan term in years", type: "number" },
        { name: "Estimated monthly EMI", type: "currency" },
        { name: "Type of mortgage", type: "text" },
        { name: "Planned down payment", type: "currency" },
        { name: "Percentage of total price", type: "percentage" },
        { name: "Estimated closing costs", type: "currency" },
        { name: "PMI (if any)", type: "currency" },
        { name: "Assistance programs used", type: "text" },
        { name: "Cash in hand for closing", type: "currency" },
      ],
    },
    ];

  // Handle input change for any field
  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
    setActiveSection(section);
  };

  // Show description for a subsection
  const showDescription = (subSection) => {
    setSelectedSubSection(subSection);
  };

  // Check completion status of sections
  useEffect(() => {
    const newCompletionStatus = {};
    
    sections.forEach(section => {
      const totalFields = section.items.length;
      let completedFields = 0;
      
      section.items.forEach(item => {
        if (formData[item.name] && formData[item.name].toString().trim() !== '') {
          completedFields++;
        }
      });
      
      newCompletionStatus[section.title] = {
        completed: completedFields === totalFields,
        progress: totalFields > 0 ? Math.round((completedFields / totalFields) * 100) : 0
      };
    });
    
    setSectionCompletion(newCompletionStatus);
  }, [formData]);

  // Generate financial report
  const generateReport = () => {
    let reportText = "# Financial Consideration Report\n\n";
    
    sections.forEach(section => {
      reportText += `## ${section.title}\n\n`;
      
      section.items.forEach(item => {
        const value = formData[item.name] || "Not provided";
        let displayValue = value;
        
        if (item.type === "currency" && value !== "Not provided") {
          displayValue = `$${value}`;
        } else if (item.type === "percentage" && value !== "Not provided") {
          displayValue = `${value}%`;
        }
        
        reportText += `- **${item.name}**: ${displayValue}\n`;
      });
      
      reportText += "\n";
    });
    
    // Add affordability analysis
    if (formData["Monthly income"] && formData["Expected monthly housing cost"]) {
      const income = parseFloat(formData["Monthly income"]);
      const housingCost = parseFloat(formData["Expected monthly housing cost"]);
      const ratio = (housingCost / income * 100).toFixed(1);
      
      reportText += "## Affordability Analysis\n\n";
      reportText += `- **Housing cost to income ratio**: ${ratio}%\n`;
      
      if (ratio <= 28) {
        reportText += "- **Assessment**: Your housing costs are within the recommended range (less than 28% of income).\n";
      } else if (ratio <= 36) {
        reportText += "- **Assessment**: Your housing costs are slightly elevated (28-36% of income). Consider your other debts and expenses carefully.\n";
      } else {
        reportText += "- **Assessment**: Your housing costs are high relative to your income (above 36%). This may present financial stress or difficulty qualifying for loans.\n";
      }
    }
    
    setReport(reportText);
  };

  // Format currency input
  const formatCurrency = (value) => {
    if (!value) return '';
    return value.replace(/[^\d.]/g, '');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Navigation */}
      <aside className="sticky top-0 h-screen w-72 bg-white shadow-md overflow-y-auto border-r border-gray-200">
        <div className="p-4 border-b border-gray-200 bg-blue-600 text-white">
          <h2 className="font-bold text-lg">Financial Consideration</h2>
        </div>
        
        <nav className="p-2">
          <ul className="space-y-1">
            {sections.map((sectionData) => (
              <li key={sectionData.title} className="mb-2">
                <div 
                  className={`flex justify-between items-center w-full p-3 rounded-md cursor-pointer border ${
                    activeSection === sectionData.title 
                      ? "bg-blue-50 border-blue-300 text-blue-700" 
                      : "hover:bg-gray-100 border-transparent"
                  }`}
                  onClick={() => toggleSection(sectionData.title)}
                >
                  <div className="flex items-center space-x-2">
                    {sectionCompletion[sectionData.title]?.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <div className="relative h-5 w-5 flex-shrink-0">
                        <div className="absolute inset-0 rounded-full border-2 border-gray-300"></div>
                        <div 
                          className="absolute inset-0 rounded-full border-2 border-blue-500"
                          style={{ 
                            clipPath: `polygon(0 0, 100% 0, 100% ${sectionCompletion[sectionData.title]?.progress || 0}%, 0 ${sectionCompletion[sectionData.title]?.progress || 0}%)` 
                          }}
                        ></div>
                      </div>
                    )}
                    <span className="font-medium">{sectionData.title}</span>
                  </div>
                  {expandedSections[sectionData.title] ? (
                    <ChevronUp className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  )}
                </div>
                
                {expandedSections[sectionData.title] && (
                  <ul className="mt-1 ml-7 space-y-1">
                    {sectionData.items.map((item) => (
                      <li
                        key={item.name}
                        className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                      >
                        <div className="flex items-center space-x-2">
                          <span
                            className="font-medium text-blue-600"
                            onClick={() => showDescription(item.name)}
                          >
                            {item.name}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 p-8 space-y-8">
        <h2 className="text-2xl font-semibold">Financial Consideration</h2>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {sections.map((sectionData) => (
            <div key={sectionData.title} className="space-y-6">
              <h3 className="text-xl font-semibold">{sectionData.title}</h3>
              {sectionData.items.map((item) => (
                <div key={item.name} className="flex items-center space-x-3">
                  <label className="w-1/3">{item.name}</label>
                  <input
                    type={item.type === 'number' ? 'number' : 'text'}
                    className="w-2/3 p-2 border rounded-md"
                    value={formData[item.name] || ''}
                    onChange={(e) => handleInputChange(item.name, e.target.value)}
                    placeholder={`Enter ${item.name}`}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        
        {/* Generate Report Button */}
        <button
          onClick={generateReport}
          className="bg-blue-600 text-white py-2 px-6 rounded-md shadow-md mt-6"
        >
          Generate Financial Report
        </button>
        
        {/* Report Preview */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold">Report Preview</h3>
          <textarea
            className="w-full h-64 p-4 mt-2 border rounded-md"
            value={report}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default FinancialConsideration;
