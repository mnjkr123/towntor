import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, ArrowRight, HelpCircle } from 'lucide-react';
import '../../asset/css/FinancialConsideration.css';
import { subSectionDescriptions, sections } from '../../data/financialData';

const FinancialConsideration = () => {
  const [activeSection, setActiveSection] = useState("Budget and Affordability");
  const [expandedSections, setExpandedSections] = useState({
    "Budget and Affordability": true
  });
  const [selectedField, setSelectedField] = useState("Maximum budget");  
  const [formData, setFormData] = useState({});
  const [reports, setReports] = useState({});
  const [sectionCompletion, setSectionCompletion] = useState({});
  const [finalQualification, setFinalQualification] = useState("Not Qualified"); // Initial state
  const [finalReport, setFinalReport] = useState("");
  const apiKey = "AIzaSyAKpcR0u8CmnIKDjsoFVSNzSmmSoHz0jXU"; // Updated API key

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

  // Determine final qualification based on reports and form data
  const determineFinalQualification = async () => {
    let finalReport = `# Final Qualifying Report\n\n`;
    finalReport += `This report provides a final qualification based on the data you've entered and the individual section reports.\n\n`;
    finalReport += `\n\n**Mortgage Check Context:** Real Estate Home Purchase`;
    finalReport += `\n\n**Analysis of Key Factors:**\n`;
  
    let qualified = true;
    let reviewNeeded = false;
  
    // Example logic - replace with actual qualification rules
    if (formData["Maximum budget"] < 100000 || formData["Credit score"] < 600) {
      qualified = false;
      reviewNeeded = true;
      finalReport += `- **Maximum Budget and/or Credit Score:** Below minimum threshold. Please review.\n`;
    } else {
        finalReport += `- **Maximum Budget and Credit Score:** Meet minimum requirements.\n`;
      }
  
    // Set final qualification status
    let status = "Needs Review";
    if (qualified && !reviewNeeded) {
      status = "Qualified";
      finalReport += `\n\n**Final Qualification:** Qualified\n`;
    } else if (!qualified) {
        status = "Not Qualified";
        finalReport += `\n\n**Final Qualification:** Not Qualified\n`;
    } else {
        finalReport += `\n\n**Final Qualification:** Needs Review\n`;
      }
  
    finalReport += `\n\nPlease note that this is a simulated report and the analysis may not reflect actual financial advice. Consult with a financial expert for personalized recommendations.`;
    finalReport += `\n\nFor further assistance, please contact our support team or schedule a consultation with one of our financial advisors.`;
  
    return { status, report: finalReport };
  };
  
  const getAIReport = async (sectionName, apiKey) => {
    const prompt = `Generate a financial report for the section "${sectionName}" in the context of a real estate home purchase. Here are the inputs:\n\n` +
    sections.find(s => s.title === sectionName)?.items
      .map(item => `- ${item.name}: ${formData[item.name] || "Not provided"}`).join('\n');
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro-exp-03-25:generateContent?key=${apiKey}`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      })
    };
    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error.message}`);
      }
      const data = await response.json();
      if (data?.candidates && data?.candidates.length > 0 && data.candidates[0]?.content?.parts && data.candidates[0]?.content?.parts.length > 0 && data.candidates[0].content.parts[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      } else {
        return `Error: No valid response from Gemini API.`;
      }
    } catch (error) {
      console.error("Error fetching AI report:", error);
      return `Error: Could not generate report for ${sectionName}. ${error.message}`;
    }
  };
  // Generate report for a specific section
  const generateSectionReport = async (sectionName) => {
    const report = await getAIReport(sectionName, apiKey);
    setReports(prev => ({ ...prev, [sectionName]: report }));

  }
  const generateFinalReport = async () => {
    const { status, report } = await determineFinalQualification();
    setFinalQualification(status);
    setFinalReport(report);
  };

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
            let nextSection;
            if (currentSectionIndex + 1 < sections.length) {
              nextSection = sections[currentSectionIndex + 1];
              setActiveSection(nextSection.title);
              setExpandedSections(prev => ({
                ...prev,
                [nextSection.title]: true
              }));
              setSelectedField(nextSection.items[0].name);
            } else {
              nextSection = sections[0];
              setActiveSection(nextSection.title);
              setExpandedSections(prev => ({
              ...prev,
              [nextSection.title]: true
            }));
            setSelectedField(nextSection.items[0].name);
          }
        }
      }
    
  };};

  const allSectionsCompleted = Object.values(sectionCompletion).every(section => section.completed);

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
           {/* Final Qualification Section */}
           <div key="Final Qualification" className="section-item">
            <div className={`section-header ${activeSection === "Final Qualification" ? 'active' : ''}`}>
              <div className="section-circle">
                <span className={`circle ${allSectionsCompleted ? '' : ''}`}></span>
              </div>
              <span className="section-title">Final Qualification</span>
              <span className="section-status">{allSectionsCompleted ? finalQualification : ""}</span>
            </div>
          </div>
        </div>
        {/* Generate Final Report Button - Conditionally rendered */}
        <div className="generate-final-report-container">
          {allSectionsCompleted && (
            <button onClick={generateFinalReport} className="generate-final-btn">
              Generate Final Report
            </button>
          )}
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

          {/* Generate Section Reports Buttons */}
          <div className="section-buttons-container">
            {sections.map(section => (
              <div key={section.title}>
                <button onClick={() => generateSectionReport(section.title)} className="generate-btn">
                  Generate {section.title} Report
                </button>
                {reports[section.title] && <pre className="section-report-box">{reports[section.title]}</pre>}
              </div>
            ))}
            {/* Final Report Display */}
            {finalReport && <pre className="final-report-box">{finalReport}</pre>}
          </div>

        </div>
      </div>
    </div>
  );
};
export default FinancialConsideration;