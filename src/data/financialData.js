export const subSectionDescriptions = {
  "Budget": "Enter the highest amount you're willing to spend on your new home. Consider your savings, income, and financial goals to determine a comfortable budget.",
  "Monthly income": "Enter your total household income after taxes. This helps determine what you can afford for monthly housing payments.",
  "Down payment": "Enter the amount or percentage of the home's purchase price that you plan to pay upfront. This affects your loan amount and monthly mortgage payments.",
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

export const sections = [
  {
    title: "Budget and Affordability",
    subSections: [
      {
        title: "Budget",
        items: [
          { name: "Maximum Budget", type: "currency" },
          { name: "Purchase Budget", type: "currency" },
        ],
      },
      {
        title: "Monthly Income & Costs",
        items: [
          { name: "Monthly income", type: "currency" },
          { name: "Expected monthly housing cost", type: "currency" },
          { name: "Estimated moving costs", type: "currency" },
          { name: "Furniture & renovation expenses", type: "currency" },
          { name: "Emergency fund amount", type: "currency" },
        ],
      },
      {
        title: "Down Payment",
        items: [
          { name: "Down payment", type: "currency" },
          { name: "Percentage of total price", type: "percentage" },
        ],
      },
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
