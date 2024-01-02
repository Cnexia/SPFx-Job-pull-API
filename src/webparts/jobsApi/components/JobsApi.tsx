import React, { useEffect, useState } from 'react';
import styles from './JobsApi.module.scss';
import { IJobsApiProps } from './IJobsApiProps';
import axios from 'axios';

  const JobsApi: React.FC<IJobsApiProps> = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredJob, setFilteredJob] = useState<any | null>(null);

  useEffect(() => {
    // Fetch job data from the API
    axios
      .post('https://cnexia-preprod.hrmaps.cloud/api/AdepApi/GetJobOfferList/0')
      .then((response) => {
        const fetchedJobs = response.data.reverse(); // Reverse the 'jobs' array
        setJobs(fetchedJobs);
      })
      .catch((error) => {
        console.error('Error fetching job data:', error);
      });
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    // Filter jobs based on the search term
    if (searchTerm === '') {
      // If the search term is empty, set filtered job to null to display all jobs
      setFilteredJob(null);
    } else {
      const matchingJob = jobs.find((job) => {
        const title = job['PositionTitle'].toLowerCase();
        
        return title.includes(searchTerm);
      });

      // Update the filtered job with the matching job or set it to null if no match is found
      setFilteredJob(matchingJob || null);
    }
  };

  return (
<section className={styles.jobsApi}>
<div className={styles.container_title}>
    <p>Latest job offers</p>
</div>
<div className={styles.Jobs_container}>
    <div className={styles.job_navigation_bar}>
        <div className={styles.serch_icon}>
            <svg id="serch_icon" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.75 18.25L1 24" stroke="#9A9A9A" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M24 10.8571C24 16.3011 19.5868 20.7143 14.1429 20.7143C11.4162 20.7143 8.94798 19.6072 7.16351 17.8179C5.38511 16.0349 4.28571 13.5744 4.28571 10.8571C4.28571 5.41319 8.69892 1 14.1429 1C19.5868 1 24 5.41319 24 10.8571Z" stroke="#9A9A9A" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>   
        </div>
        
        <input
        className={styles.job_search_input} 
        type="text" 
        placeholder="Search for job titles..."
        value={searchTerm}
        onChange={handleSearch}
        />
        
    </div>
    <div className={styles.jobs_display_container}>
    {filteredJob === null ? (
      jobs.length === 0 ? (
        <p>Loading...</p> // Display a message when there are no matches

      ) : (
        jobs.map((job) => (
  
    <div key={job['PositionTitle']}  className={styles.jobs_display}>
        <div  className={styles.ACI}>
            <p>ACI</p>
        </div>
        <div  className={styles.job_title}>
            <h2>
              {job['PositionTitle']}
            </h2>
        </div>
        <div  className={styles.job_description}>
              <p>{job['PositionOfferingType.Name']}</p>
              <div dangerouslySetInnerHTML={{ __html: job['PositionFormattedDescription']['Content'] }} />
        </div>
        <div  className={styles.card_button}>
            <a href="#">
                Read more
            </a>
        </div>
    </div>
  
     ))
     )
     ) : (
          
            <div className={styles.jobs_display}>
              <div  className={styles.ACI}>
                  <p>ACI</p>
              </div>
              <div  className={styles.job_title}>
                  <h2>
                    {filteredJob['PositionTitle']}
                  </h2>
              </div>
              <div  className={styles.job_description}>
                    <p>
                      <div className={styles.job_description_field} dangerouslySetInnerHTML={{ __html: filteredJob['PositionFormattedDescription']['Content'] }} />
                    </p>
              </div>
              <div  className={styles.card_button}>
                  <a href="#">
                      Read more
                  </a>
              </div>
            </div>
          
    )}
    </div>

</div>

</section>
  );


};




export default JobsApi;
