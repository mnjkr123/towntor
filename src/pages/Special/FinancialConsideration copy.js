import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, CheckCircle } from 'lucide-react';

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
    
    "Planned down payment": "The amount you plan to pay upfront. Larger down payments typically result in better loan terms.",
    "Percentage of total price": "Your down payment as a percentage of the home's purchase price. 20% or more typically avoids PMI.",
    "Estimated closing costs": "Additional fees paid at closing, typically 2-5% of the loan amount, including appraisal, title insurance, and attorney fees.",
    "PMI (if any)": "Private Mortgage Insurance is typically required if your down payment is less than 20% of the home's value.",
    "Assistance programs used": "Government or lender programs that might help with your down payment or closing costs.",
    "Cash in hand for closing": "The total amount you'll need available at closing, including down payment and closing costs.",
    
    "Annual property tax": "The yearly amount you'll pay in property taxes, which varies by location and property value.",
    "Monthly tax cost": "The monthly portion of your annual property tax, often included in your mortgage payment through escrow.",
    "Tax rate (%)": "The percentage rate at which your property is taxed by local government.",
    "Are tax increases expected?": "Information about potential property tax increases in the near future.",
    "Reason for property tax increase": "Common reasons include reassessments, local budget changes, or new municipal projects.",
    "Tax escrow amount": "The amount held in escrow by your lender to pay property taxes when due.",
    
    "Estimated annual premium": "The yearly cost of your homeowner's insurance policy.",
    "Monthly premium cost": "The monthly portion of your annual insurance premium, often included in your mortgage payment.",
    "Coverage types included": "The types of coverage included in your policy, such as dwelling, personal property, and liability.",
    "Any exclusions?": "Important items or events not covered by your standard insurance policy.",
    "Additional coverage needed": "Extra coverage you might need, such as flood insurance or coverage for high-value items.",
    "Discounts applicable": "Potential insurance discounts for home security systems, bundling policies, etc.",
    
    "Annual maintenance estimate": "Experts recommend budgeting 1-4% of your home's value annually for maintenance.",
    "Immediate repairs estimate": "Costs for any repairs identified during inspection that need immediate attention after purchase.",
    "Monthly maintenance cost": "The monthly amount you should set aside for ongoing home maintenance.",
    "Warranty available?": "Information about any home warranty that may cover appliance or system failures.",
    "Annual HOA fee (if any)": "Yearly fees paid to a Homeowners Association, if applicable.",
    "What does HOA cover?": "Services and amenities covered by your HOA fees, such as landscaping, common areas, or security.",
    "Unexpected repair buffer": "Additional funds set aside specifically for unexpected home repairs or emergencies."
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
    {
      title: "Insurance Details",
      items: [
        { name: "Annual property tax", type: "currency" },
        { name: "Monthly tax cost", type: "currency" },
        { name: "Tax rate (%)", type: "percentage" },
        { name: "Are tax increases expected?", type: "text" },
        { name: "Reason for property tax increase", type: "text" },
        { name: "Tax escrow amount", type: "currency" },
        { name: "Estimated annual premium", type: "currency" },
        { name: "Monthly premium cost", type: "currency" },
        { name: "Coverage types included", type: "text" },
        { name: "Any exclusions?", type: "text" },
        { name: "Additional coverage needed", type: "text" },
        { name: "Discounts applicable", type: "text" },
      ],
    },
    {
      title: "Closing Details",
      items: [
        { name: "Annual maintenance estimate", type: "currency" },
        { name: "Immediate repairs estimate", type: "currency" },
        { name: "Monthly maintenance cost", type: "currency" },
        { name: "Warranty available?", type: "text" },
        { name: "Annual HOA fee (if any)", type: "currency" },
        { name: "What does HOA cover?", type: "text" },
        { name: "Unexpected repair buffer", type: "currency" },
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
                        className={`px-3 py-2 text-sm rounded-md cursor-pointer flex items-center ${
                          selectedSubSection === item.name
                            ? "bg-blue-100 text-blue-700"
                            : "hover:bg-gray-100"
                        } ${formData[item.name] ? "text-gray-900" : "text-gray-500"}`}
                        onClick={() => showDescription(item.name)}
                      >
                        {formData[item.name] && (
                          <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                        )}
                        <span>{item.name}</span>
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
      <main className="flex-1 bg-white">
        <div className="bg-blue-700 text-white p-6">
          <h1 className="text-2xl font-bold">Financial Considerations for Home Purchase</h1>
          <p className="text-blue-100 mt-1">Complete each section to generate your financial readiness report</p>
        </div>
        
        <div className="max-w-3xl mx-auto p-6">
          {/* Current Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">{activeSection}</h2>
              <span className="text-sm text-gray-500">
                {sectionCompletion[activeSection]?.progress || 0}% Complete
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${sectionCompletion[activeSection]?.progress || 0}%` }}
              ></div>
            </div>
            
            {/* Selected Subsection */}
            {selectedSubSection && (
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <HelpCircle className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">{selectedSubSection}</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {subSectionDescriptions[selectedSubSection] || "No description available for this field."}
                    </p>
                    
                    {/* Dynamic Input Field */}
                    {sections.flatMap(s => s.items).find(item => item.name === selectedSubSection) && (
                      <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Enter {selectedSubSection.toLowerCase()}:
                        </label>
                        <div className="relative">
                          {(() => {
                            const item = sections.flatMap(s => s.items).find(i => i.name === selectedSubSection);
                            if (!item) return null;
                            
                            if (item.type === "currency") {
                              return (
                                <div className="relative">
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                                  <input
                                    type="text"
                                    className="w-full p-2 pl-6 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    value={formData[selectedSubSection] || ""}
                                    onChange={(e) => handleInputChange(selectedSubSection, formatCurrency(e.target.value))}
                                    placeholder="0.00"
                                  />
                                </div>
                              );
                            } else if (item.type === "percentage") {
                              return (
                                <div className="relative">
                                  <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    value={formData[selectedSubSection] || ""}
                                    onChange={(e) => handleInputChange(selectedSubSection, formatCurrency(e.target.value))}
                                    placeholder="0.0"
                                  />
                                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">%</span>
                                </div>
                              );
                            } else if (item.type === "number") {
                              return (
                                <input
                                  type="number"
                                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                  value={formData[selectedSubSection] || ""}
                                  onChange={(e) => handleInputChange(selectedSubSection, e.target.value)}
                                  placeholder="Enter value"
                                />
                              );
                            } else {
                              return (
                                <input
                                  type="text"
                                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                  value={formData[selectedSubSection] || ""}
                                  onChange={(e) => handleInputChange(selectedSubSection, e.target.value)}
                                  placeholder="Enter information"
                                />
                              );
                            }
                          })()}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Section Fields - Grid View */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sections.find(section => section.title === activeSection)?.items.map((item) => (
                <div 
                  key={item.name}
                  className={`p-4 border rounded-md cursor-pointer ${
                    formData[item.name] ? "border-green-300 bg-green-50" : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                  } ${selectedSubSection === item.name ? "ring-2 ring-blue-400" : ""}`}
                  onClick={() => showDescription(item.name)}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.name}</span>
                    {formData[item.name] && <CheckCircle className="h-4 w-4 text-green-500" />}
                  </div>
                  <div className={`mt-1 ${formData[item.name] ? "text-gray-900" : "text-gray-400 italic"}`}>
                    {(() => {
                      if (!formData[item.name]) return "Not entered";
                      
                      if (item.type === "currency") {
                        return `$${formData[item.name]}`;
                      } else if (item.type === "percentage") {
                        return `${formData[item.name]}%`;
                      } else {
                        return formData[item.name];
                      }
                    })()}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Generate Report Button */}
          <div className="mt-8 mb-10">
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg shadow-md transition duration-200"
              onClick={generateReport}
            >
              Generate Financial Report
            </button>
          </div>
          
          {/* Report Output */}
          {report && (
            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Your Financial Consideration Report</h3>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 whitespace-pre-wrap text-sm font-mono">
                {report}
              </div>
              <div className="mt-4 flex justify-end">
                <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-2 px-4 rounded">
                  Download Report
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FinancialConsideration;