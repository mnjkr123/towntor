import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown, ChevronUp, ArrowRight, HelpCircle, Info, X } from 'lucide-react';
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
  const [finalQualification, setFinalQualification] = useState("Not Qualified");
  const [finalReport, setFinalReport] = useState("");
  const [sidebarWidth, setSidebarWidth] = useState(280); // Default width
  const [isDragging, setIsDragging] = useState(false);
  const [rightSidebarVisible, setRightSidebarVisible] = useState(false);
  const [rightSidebarContent, setRightSidebarContent] = useState({ title: '', description: '' });
  const apiKey = "AIzaSyAKpcR0u8CmnIKDjsoFVSNzSmmSoHz0jXU"; // Updated API key
  const sidebarRef = useRef(null);
  const [dragData, setDragData] = useState({ startX: 0, startWidth: 0 });
  // Handle dragging motion
  const handleDragging = (e) => {
    if (isDragging) {
      const sidebar = sidebarRef.current;
      if (!sidebar) return;
      const newWidth = dragData.startWidth + (e.clientX - dragData.startX);
      const minWidth = 200;
      const maxWidth = 400;
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setSidebarWidth(newWidth);
      }
    }
  };
  const stopDragging = useCallback(() => {
    setIsDragging(false);
    window.removeEventListener('mousemove', handleDragging);
    window.removeEventListener('mouseup', stopDragging);
  }, [handleDragging]);
  // Start dragging the sidebar
  const startDragging = (e) => {
    e.preventDefault();
    const sidebar = sidebarRef.current;   
    if (!sidebar) return;    
    setIsDragging(true);
    setDragData({ startX: e.clientX, startWidth: sidebar.offsetWidth });
    window.addEventListener('mousemove', handleDragging);
  };
  useEffect(() => {
    document.addEventListener('mouseup', stopDragging);
     return () => {
        document.removeEventListener('mouseup', stopDragging);
    }
  }, [stopDragging,dragData]);

 

 

  // Show info in right sidebar
  const showInfoInRightSidebar = (title, fieldName) => {
    setRightSidebarContent({
      title: fieldName,
      description: subSectionDescriptions[fieldName] || "No additional information available."
    });
    setRightSidebarVisible(true);
  };

  // Close right sidebar
  const closeRightSidebar = () => {
    setRightSidebarVisible(false);
  };

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

    // Find the first field of the section, considering subsections
    const currentSection = sections.find(s => s.title === section);
    let firstField;

    if (currentSection) {
      if (currentSection.items && currentSection.items.length > 0) {
        firstField = currentSection.items[0].name;
      } else if (currentSection.subSections){
                for (const subSection of currentSection.subSections) {
                    if (subSection.items && subSection.items.length > 0) {
                        firstField = subSection.items[0].name;
                        break;
                    }
                }
      }
      if (firstField) setSelectedField(firstField);
    }
  };

  // Select a specific field
  const selectField = (fieldName) => {
    setSelectedField(fieldName);
    // Also show info in right sidebar
    showInfoInRightSidebar('Field Info', fieldName);
  };

  // Get the current field's type
  const getCurrentFieldType = () => {
    const currentSection = sections.find(section => {
      if (section.items && section.items.some(item => item.name === selectedField)) {
        return true;
      }
      if (section.subSections) {
        return section.subSections.some(subSection => 
          subSection.items && subSection.items.some(item => item.name === selectedField)
        );
      }
      return false;
    });

    if (!currentSection) return "text";

    const currentItem = currentSection.items?.find(item => item.name === selectedField);
    if (currentItem) return currentItem.type || "text";

    // Check in subSections if not found in main items
    if (currentSection.subSections) {    
            for (const subSection of currentSection.subSections) {
                if (subSection.items) {
                    const item = subSection.items.find(item => item.name === selectedField);
                    if (item) return item.type || "text";
                }
    }
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
      let totalFields = section.items?.length || 0;
      let completedFields = 0;

      if (section.items) {
                section.items.forEach(item => {
                    if (formData[item.name] && formData[item.name].toString().trim() !== '') {
                        completedFields++;
                    }
                });
            }
      if (section.subSections) {        
        section.subSections.forEach(subSection => {          
          if (subSection.items) {
            totalFields += subSection.items.length;
            subSection.items.forEach(item => {
              if (formData[item.name] && formData[item.name].toString().trim() !== '') {
                completedFields++;
              }
            });
          }
        });
      }      
      newCompletionStatus[section.title] = {
        completed: completedFields === totalFields && totalFields > 0,
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
    let prompt = `Generate a financial report for the section "${sectionName}" in the context of a real estate home purchase. Here are the inputs:\n\n`;    
    const section = sections.find(s => s.title === sectionName);

    if (section) {    
            if (section.items) {
                section.items.forEach(item => {
                    prompt += `- ${item.name}: ${formData[item.name] || "Not provided"}\n`;
                });
            }

      if (section.subSections) {
        section.subSections.forEach(subSection => {
          if (subSection.items) {
            subSection.items.forEach(item => {
              prompt += `- ${item.name}: ${formData[item.name] || "Not provided"}\n`;
            });
          }
        });
      }
    }

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
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error?.message || 'Unknown error'}`);
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
  };

  const generateFinalReport = async () => {
    const { status, report } = await determineFinalQualification();
    setFinalQualification(status);
    setFinalReport(report);
  };

  // Navigate to next field in the section
  const goToNextField = () => {    
    // Find the section that contains the currently selected field
    const currentSection = sections.find(section => {
      // Check if the field is in the main items array
      if (section.items && section.items.some(item => item.name === selectedField)) {
        return true
      }

      // Check if the field is in any subsection
      if (section.subSections) {
        return section.subSections.some(subSection =>
          subSection.items && subSection.items.some(item => item.name === selectedField)
        );
      }

      return false;      
    });
    

       
    if (!currentSection) {     
      console.error("Could not find section containing field:", selectedField);
      return;
    }

    // Check if the field is in the main items
    const isInMainItems = currentSection.items && 
                         currentSection.items.some(item => item.name === selectedField);

    if (isInMainItems) {
      const currentIndex = currentSection.items.findIndex(item => item.name === selectedField);

      // If not the last item in main items, go to next item
      if (currentIndex < currentSection.items.length - 1) {
        setSelectedField(currentSection.items[currentIndex + 1].name);
        showInfoInRightSidebar('Field Info', currentSection.items[currentIndex + 1].name);
        return
      }
      
      // If there are subsections, go to the first item of the first subsection
      if (currentSection.subSections && currentSection.subSections.length > 0) {
        const firstSubSection = currentSection.subSections[0];
        if (firstSubSection.items && firstSubSection.items.length > 0) {
          setSelectedField(firstSubSection.items[0].name);
          showInfoInRightSidebar('Field Info', firstSubSection.items[0].name);
          return
        }
      }
      // Otherwise, go to the next section
       goToNextSection(currentSection);
      return;
    }
    
    // If the field is in a subsection
    if (currentSection.subSections) {
      // Find which subsection contains the field    
      const subSectionWithField = currentSection.subSections.find(subSection => 
        subSection.items && subSection.items.some(item => item.name === selectedField)
      );

      if (subSectionWithField) {
        const currentSubIndex = subSectionWithField.items.findIndex(item => item.name === selectedField);

        // If not the last item in this subsection, go to next item
        if (currentSubIndex < subSectionWithField.items.length - 1) {
          setSelectedField(subSectionWithField.items[currentSubIndex + 1].name);
          showInfoInRightSidebar('Field Info', subSectionWithField.items[currentSubIndex + 1].name);
          return
        }
        
        // Find current subsection index
        const currentSubSectionIndex = currentSection.subSections.findIndex(
          subSection => subSection === subSectionWithField
        );
        
        // If not the last subsection, go to first item of next subsection
        if (currentSubSectionIndex < currentSection.subSections.length - 1) {
          const nextSubSection = currentSection.subSections[currentSubSectionIndex + 1];
          if (nextSubSection.items && nextSubSection.items.length > 0) {
            setSelectedField(nextSubSection.items[0].name);
            showInfoInRightSidebar('Field Info', nextSubSection.items[0].name);
             return;
          }
        }
        // Otherwise, go to the next section
         goToNextSection(currentSection);
        return
      }
    }
  };

  // Helper function to go to the next section
  const goToNextSection = (currentSection) => {
    const currentSectionIndex = sections.findIndex(section => section.title === currentSection.title);
    
    // If not the last section, go to the first item of next section
    if (currentSectionIndex < sections.length - 1) {
      const nextSection = sections[currentSectionIndex + 1];      
      setActiveSection(nextSection.title);
      setExpandedSections(prev => ({
         ...prev,
        [nextSection.title]: true
      }));
      
      if (nextSection.items && nextSection.items.length > 0) {
        setSelectedField(nextSection.items[0].name);
        showInfoInRightSidebar('Field Info', nextSection.items[0].name);
      }
    } else {
      // If it's the last section, you could loop back to the first section or handle differently
      const firstSection = sections[0];
      setActiveSection(firstSection.title);
      setExpandedSections(prev => ({
        ...prev,
        [firstSection.title]: true
      }));
      
      if (firstSection.items && firstSection.items.length > 0) {
        setSelectedField(firstSection.items[0].name);    
        showInfoInRightSidebar('Field Info', firstSection.items[0].name);
      }
    }
  };

  const allSectionsCompleted = Object.values(sectionCompletion).every(section => section.completed);

  // Get the current section that contains the selected field
  const getCurrentSection = () => {
    const section = sections.find(section => {
            if (section.items && section.items.some(item => item.name === selectedField)) {
                return true;
            }
            if (section.subSections) {
        return section.subSections.some(subSection => 
                    subSection.items && subSection.items.some(item => item.name === selectedField)
        );
      }     
      return false;
    });
    
    return section?.title || activeSection;
  };

  // Get completion percentage for the current section
  const getCurrentSectionProgress = () => {
    const sectionTitle = getCurrentSection();
    return sectionCompletion[sectionTitle]?.progress || 0;
  };

  return ( <div className="financial-container"> {/* Left sidebar with draggable handle */} 
      <div 
        className="sidebar" 
        ref={sidebarRef}
        style={{ width: `${sidebarWidth}px` }}
      >
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
                {section.items &&
                  section.items.map((item, index) => (
                    <div
                      key={index}
                      className={`field-item ${selectedField === item.name ? 'selected' : ''}`}
                      onClick={() => selectField(item.name)}
                    >
                      <div className={`sidebar-button ${section.items.length > 0 && index === 0 ? "" : "child-button"}`}>
                       <div className="modern-button">{item.name}</div>                     
                         {formData[item.name] && formData[item.name].toString().trim() !== "" && (<span className="field-completed-mark">✓</span>
                        )}                       
                       <Info 
                         size={14} 
                         className="info-icon" 
                         onClick={(e) => {
                           e.stopPropagation();
                           showInfoInRightSidebar(section.title, item.name);
                         }}
                       />
                      </div>
                    </div>
                  ))}
                   {section.subSections && section.subSections.map((subSection) => (
                     <React.Fragment
                        key={subSection.title || subSection.name}
                      >
                        <h6 className="text-primary mt-4 modern-button">
                          {subSection.title}
                        </h6>
                        {subSection.items && subSection.items.map(item => (
                          <div 
                          key={item.name} 
                          className={`field-item ${selectedField === item.name ? 'selected' : ''}`}
                          onClick={() => selectField(item.name)}                          
                        >
                          <div className="sidebar-button child-button">
                            <div className="modern-button">{item.name}</div>
                          {formData[item.name] && formData[item.name].toString().trim() !== '' && (<span className="field-completed-mark">✓</span>)}
                          <Info
                            size={14} 
                            className="info-icon" 
                            onClick={(e) => {
                              e.stopPropagation();
                              showInfoInRightSidebar(section.title, item.name);
                            }}
                          />
                           </div>
                        </div>
                        ))}
                      </React.Fragment>
                    ))}
                </div>
              )}
            </div>
          ))}
           
           <div key="Final Qualification" className={`section-item`}>
            <div className={`section-header ${activeSection === "Final Qualification" ? 'active' : ''} modern-button`} onClick={() => toggleSection("Final Qualification")}>
              <div className="section-circle">
               <span className={`circle ${allSectionsCompleted ? '' : ''}`}></span>               
              </div>
              <span className="section-title">Final Qualification</span>                 
              <span className="section-icon" style={{marginLeft:"10px"}} ></span>
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
        
        {/* Draggable handle */}
        <div 
         className="sidebar-resizer"
          onMouseDown={startDragging}
        ></div>
      </div>
      
      {/* Main content */}
      <div className="main-content" style={{ marginLeft: `${sidebarWidth}px` }}>
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
            
            <button onClick={goToNextField} className="modern-button">
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
      
      {/* Right sidebar for field information */}
      <div className={`right-sidebar ${rightSidebarVisible ? 'visible' : ''}`}>
        <div className="right-sidebar-header">
          <h3>{rightSidebarContent.title}</h3>
          <button className="close-sidebar-btn" onClick={closeRightSidebar}>
            <X size={18} />
          </button>
        </div>
        <div className="right-sidebar-content">
          <p>{rightSidebarContent.description}</p>
        </div>
      </div> 
      </div>)
};

export default FinancialConsideration;
