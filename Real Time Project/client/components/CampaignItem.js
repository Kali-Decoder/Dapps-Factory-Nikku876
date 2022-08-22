import React from "react";
import Link from 'next/link'
const CampaignItem = ({value}) => {
 
  return (
    
    <>
      <div className="campaign-item px-4 py-1 mt-3">
        <code className="text-left text-danger">
          {value}
        </code>
        <code className="text-primary">
          <Link href={`/campaigns/view/${value}`}>
            <a>View Campaign</a>
          </Link>
        </code>
      </div>
    </>
  );
};

export default CampaignItem;
