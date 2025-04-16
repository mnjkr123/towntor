import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, ArrowRight, HelpCircle } from 'lucide-react';
import '../../asset/css/FinancialConsideration.css';

const FinancialConsideration = () => {
  const [activeSection, setActiveSection] = useState("Budget and Affordability");
  const [expandedSections, setExpandedSections] = useState({
    "Budget and Affordability": true
  });
  const [selectedField, setSelectedField] = useState("Maximum budget");
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
      ],
    },
    {
      title: "Insurance Details",
      items: [
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
    
    // Select the first field of the section by default
    const firstField = sections.find(s => s.title === section)?.items[0]?.name;
    if (firstField) {
      setSelectedField(firstField);
    }
  };

  // Select a specific field
  const selectField = (fieldName) => {
    setSelectedField(fieldName);
  };

  // Get the current field's type
  const getCurrentFieldType = () => {
    const currentSection = sections.find(section => 
      section.items.some(item => item.name === selectedField)
    );
    
    if (currentSection) {
      const currentItem = currentSection.items.find(item => item.name === selectedField);
      return currentItem?.type || "text";
    }
    
    return "text";
  };

  // Format input based on field type
  const formatInput = (value, type) => {
    if (!value) return '';
    
    switch (type) {
      case 'currency':
        // Remove non-numeric characters except decimal
        return value.replace(/[^\d.]/g, '');
      case 'percentage':
        // Remove non-numeric characters except decimal
        return value.replace(/[^\d.]/g, '');
      case 'number':
        // Remove non-numeric characters
        return value.replace(/[^\d]/g, '');
      default:
        return value;
    }
  };

  // Get placeholder based on field type
  const getPlaceholder = (type) => {
    switch (type) {
      case 'currency':
        return 'Enter amount';
      case 'percentage':
        return 'Enter percentage';
      case 'number':
        return 'Enter number';
      default:
        return 'Enter information';
    }
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

  // Navigate to next field in the section
  const goToNextField = () => {
    const currentSection = sections.find(section => 
      section.items.some(item => item.name === selectedField)
    );
    
    if (currentSection) {
      const currentIndex = currentSection.items.findIndex(item => item.name === selectedField);
      
      if (currentIndex < currentSection.items.length - 1) {
        // Go to next field in the same section
        setSelectedField(currentSection.items[currentIndex + 1].name);
      } else {
        // Find the next section
        const currentSectionIndex = sections.findIndex(section => section.title === currentSection.title);
        
        if (currentSectionIndex < sections.length - 1) {
          const nextSection = sections[currentSectionIndex + 1];
          setActiveSection(nextSection.title);
          setExpandedSections(prev => ({
            ...prev,
            [nextSection.title]: true
          }));
          setSelectedField(nextSection.items[0].name);
        }
      }
    }
  };

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

  // Get the current section that contains the selected field
  const getCurrentSection = () => {
    return sections.find(section => 
      section.items.some(item => item.name === selectedField)
    )?.title || activeSection;
  };

  // Get completion percentage for the current section
  const getCurrentSectionProgress = () => {
    const sectionTitle = getCurrentSection();
    return sectionCompletion[sectionTitle]?.progress || 0;
  };

  return (
    <div className="financial-container">
      {/* Left sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Financial Consideration</h2>
        </div>
        
        <div className="section-list">
          {sections.map((section) => (
            <div key={section.title} className="section-item">
              <div 
                className={`section-header ${activeSection === section.title ? 'active' : ''}`}
                onClick={() => toggleSection(section.title)}
              >
                <div className="section-circle">
                  {sectionCompletion[section.title]?.completed ? (
                    <span className="circle completed"></span>
                  ) : (
                    <span className="circle"></span>
                  )}
                </div>
                <span className="section-title">{section.title}</span>
                <span className="section-icon">
                  {expandedSections[section.title] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </span>
              </div>
              
              {expandedSections[section.title] && (
                <div className="section-fields">
                  {section.items.map(item => (
                    <div 
                      key={item.name} 
                      className={`field-item ${selectedField === item.name ? 'selected' : ''}`}
                      onClick={() => selectField(item.name)}
                    >
                      {item.name}
                      {formData[item.name] && formData[item.name].toString().trim() !== '' && (
                        <span className="field-completed-mark">✓</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Main content */}
      <div className="main-content">
        <div className="header-banner">
          <p>Complete each section to generate your financial readiness report</p>
        </div>
        
        <div className="content-container">
          <div className="section-title-row">
            <h2>{getCurrentSection()}</h2>
            <span className="completion-status">
              {getCurrentSectionProgress()}% Complete
            </span>
          </div>
          
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{width: `${getCurrentSectionProgress()}%`}}
            ></div>
          </div>
          
          {/* Field focused view - TurboTax style */}
          <div className="field-focus-view">
            <h3 className="field-name">{selectedField}</h3>
            
            <div className="field-description">
              <HelpCircle size={18} className="help-icon" />
              <p>{subSectionDescriptions[selectedField] || "Enter the requested information."}</p>
            </div>
            
            <div className="input-container">
              {getCurrentFieldType() === 'currency' && <span className="currency-symbol">$</span>}
              <input
                type="text"
                value={formData[selectedField] || ''}
                onChange={(e) => handleInputChange(selectedField, formatInput(e.target.value, getCurrentFieldType()))}
                placeholder={getPlaceholder(getCurrentFieldType())}
                className={getCurrentFieldType() === 'currency' ? 'currency-input' : ''}
              />
              {getCurrentFieldType() === 'percentage' && <span className="percentage-symbol">%</span>}
            </div>
            
            <button onClick={goToNextField} className="next-field-btn">
              Continue <ArrowRight size={18} />
            </button>
          </div>
          
          <div className="button-container">
            <button onClick={generateReport} className="generate-btn">
              Generate Financial Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialConsideration;
