import React from 'react'

export const HOmeValueThankYOuPageCOmpnent = ({ hoemdata }) => {

    console.log("hoemdata", hoemdata)
    function formatAmount(amount) {
        if (amount !== null) {
          const numericValue = parseFloat(amount.toString().replace(/,/g, ''));
          if (!isNaN(numericValue)) {
            // Use toLocaleString with custom options for grouping
            return numericValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2, useGrouping: true });
          }
          return ''; // Return an empty string if the input is not a valid number
        }
      }


    return (
        <>
            {hoemdata?.PlanTypeDetails[0]?.home_plan_type === "642279d4fb67d39380fef82d" ? (
                <div className="col-md-4">
                    <label>Building Value (AED)</label>
                    <input
                        type="text"
                        value={formatAmount(HomeInsurance.building_value)}
                        onChange={(e) => handleselectdata("building_value", e)}
                        required
                        placeholder="Building value"
                        aria-label="Building value"
                    />
                </div>
            ) : hoemdata?.PlanTypeDetails[0]?.home_plan_type === "642279f2fb67d39380fef834" ? (
                <>
                    <div className="col-lg-4">
                        <label>Content Value (AED)</label>
                        <input
                            type="text"
                            value={formatAmount(HomeInsurance.content_value)}
                            // onChange={(e) => handleselectdata("content_value", e)}
                            required
                            placeholder="Content Value"
                            aria-label="Content Value"
                        />
                    </div>
                    <div className="col-md-4">
                        <label>Personal belonging Value (AED)</label>
                        <input
                            type="text"
                            value={formatAmount(HomeInsurance.personal_belongings_value)}
                            // onChange={(e) => handleselectdata("personal_belongings_value", e)}
                            required
                            placeholder="Personal belongings value"
                            aria-label="Personal belongings value"
                        />
                    </div>
                </>
            ) : (
                <>
                    <div className="col-md-4">
                        <label>Content Value (AED)</label>
                        <input
                            type="text"
                            value={formatAmount(HomeInsurance.content_value)}
                            // onChange={(e) => handleselectdata("content_value", e)}
                            required
                            placeholder="Content Value"
                            aria-label="Content Value"
                        />
                    </div>
                    <div className="col-md-4">
                        <label>Building Value (AED)</label>
                        <input
                            type="text"
                            value={formatAmount(HomeInsurance.building_value)}
                            // onChange={(e) => handleselectdata("building_value", e)}
                            required
                            placeholder="Building value"
                            aria-label="Building value"
                        />
                    </div>
                    <div className="col-md-4">
                        <label>Personal belonging Value (AED)</label>
                        <input
                            type="text"
                            value={formatAmount(HomeInsurance.personal_belongings_value)}
                            // onChange={(e) => handleselectdata("personal_belongings_value", e)}
                            required
                            placeholder="Personal belongings value"
                            aria-label="Personal belongings value"
                        />
                    </div>
                </>
            )}
        </>
    )
}