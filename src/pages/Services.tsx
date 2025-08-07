import React, { useRef, useState } from 'react';
import { FileText, Calendar, Award, Users, BookOpen, Home, Heart, Percent, File, FileSpreadsheet, FileType2 } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import ServiceCard from '../components/ServiceCard';
import '../styles/Services.css';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation();
  const services = [
    {
      id: 1,
      icon: <FileText size={32} />,
      title: t('services.certificates.title', 'Certificate Issuance'),
      description: t('services.certificates.description', 'Birth, death, residence, income, and other essential certificates issued efficiently for village residents of Janori.')
    },
    {
      id: 2,
      icon: <Calendar size={32} />,
      title: t('services.hallBooking.title', 'Community Hall Booking'),
      description: t('services.hallBooking.description', 'Book our well-equipped community hall in Janori for various events, functions, and gatherings at affordable rates.')
    },
    {
      id: 3,
      icon: <Award size={32} />,
      title: t('services.schemes.title', 'Scheme Registration'),
      description: t('services.schemes.description', 'Assistance in applying for various government welfare schemes, subsidies, and benefits for eligible residents of Janori.')
    },
    {
      id: 4,
      icon: <Users size={32} />,
      title: t('services.dispute.title', 'Dispute Resolution'),
      description: t('services.dispute.description', 'Traditional Janori village-level dispute resolution mechanism to resolve conflicts amicably within the community.')
    },
    {
      id: 5,
      icon: <BookOpen size={32} />,
      title: t('services.library.title', 'Library Services'),
      description: t('services.library.description', 'Access to our Janori village library with a collection of books, newspapers, and educational resources.')
    },
    {
      id: 6,
      icon: <Home size={32} />,
      title: t('services.housing.title', 'Housing Assistance'),
      description: t('services.housing.description', 'Guidance for government housing schemes like PMAY-G for eligible beneficiaries in Janori village.')
    },
    {
      id: 7,
      icon: <Heart size={32} />,
      title: t('services.health.title', 'Health Services'),
      description: t('services.health.description', 'Coordination with primary health center for regular health camps and awareness programs in Janori.')
    },
    {
      id: 8,
      icon: <Percent size={32} />,
      title: t('services.tax.title', 'Tax Collection'),
      description: t('services.tax.description', 'Collection of property tax, water charges, and other local taxes for Janori village development.')
    }
  ];

  const schemes = [
    {
      id: 1,
      title: t('services.govSchemes.pmKisan.title', 'PM Kisan Samman Nidhi'),
      description: t('services.govSchemes.pmKisan.description', 'Direct income support of ₹6,000 per year to farmer families in Janori'),
      eligibility: t('services.govSchemes.pmKisan.eligibility', 'All small and marginal farmers with cultivable land'),
      documents: t('services.govSchemes.pmKisan.documents', 'Aadhaar Card, Land Records, Bank Account details')
    },
    {
      id: 2,
      title: t('services.govSchemes.pmay.title', 'Pradhan Mantri Awas Yojana - Gramin'),
      description: t('services.govSchemes.pmay.description', 'Financial assistance for construction of pucca houses'),
      eligibility: t('services.govSchemes.pmay.eligibility', 'Houseless families and those with kutcha/dilapidated houses'),
      documents: t('services.govSchemes.pmay.documents', 'Aadhaar Card, Income Certificate, Land documents')
    },
    {
      id: 3,
      title: t('services.govSchemes.ayushman.title', 'Ayushman Bharat'),
      description: t('services.govSchemes.ayushman.description', 'Health insurance cover of ₹5 lakh per family per year'),
      eligibility: t('services.govSchemes.ayushman.eligibility', 'Families identified through SECC database'),
      documents: t('services.govSchemes.ayushman.documents', 'Aadhaar Card, Ration Card')
    },
    {
      id: 4,
      title: t('services.govSchemes.mgnrega.title', 'MGNREGA'),
      description: t('services.govSchemes.mgnrega.description', 'Guarantee of 100 days of wage employment in a financial year'),
      eligibility: t('services.govSchemes.mgnrega.eligibility', 'Adult members of rural households willing to do unskilled manual work'),
      documents: t('services.govSchemes.mgnrega.documents', 'Job Card, Aadhaar Card, Bank Account details')
    }
  ];

  // Documentation state
  const [documents, setDocuments] = useState<Array<{ id: number; name: string; url: string; [key: string]: any }>>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // PDF Preview state
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const handlePreview = (url: string) => setPreviewUrl(url);
  const closePreview = () => setPreviewUrl(null);

  // Check admin status from localStorage
  const isAdmin = typeof window !== 'undefined' && window.localStorage.getItem('isAdmin') === 'true';

  // Helper to get icon by file type
 const getFileIcon = (name: string | undefined) => {
  if (!name) return <File size={22} style={{color:'#888'}} />;
  const ext = name.split('.').pop()?.toLowerCase();
  if (ext === 'pdf') return <FileText size={22} style={{color:'#ff4e50'}} />;
  if (ext === 'csv') return <FileSpreadsheet size={22} style={{color:'#138808'}} />;
  if (ext === 'txt') return <FileType2 size={22} style={{color:'#f9d423'}} />;
  return <File size={22} style={{color:'#888'}} />;
};

  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);

    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('uploaded_by', 'admin'); // Example static value, replace as needed
    formData.append('description', 'Uploaded via web app'); // Example static value, replace as needed
    formData.append('type', 'brochure'); // Example static value, replace as needed

    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    setDocuments(prev => [...prev, data]);
    setUploading(false);
    setUploadMsg('Document uploaded successfully!');
    setTimeout(() => setUploadMsg(null), 2500);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  React.useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setError(null);
        const response = await fetch('http://localhost:5000/documents', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        });
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Document service not found. Please check if the server is running.');
          }
          throw new Error(`Server error: ${response.status}`);
        }
        
        const data = await response.json();
        if (!Array.isArray(data)) {
          console.warn('Received non-array data:', data);
          setDocuments([]);
          return;
        }
        
        setDocuments(data);
      } catch (error) {
        console.error('Error fetching documents:', error);
        setError(error instanceof Error ? error.message : 'Failed to connect to the document service');
        setDocuments([]);
      }
    };
    fetchDocuments();
  }, []);

  const schemeLinks: { [key: number]: string } = {
    1: 'https://pmkisan.gov.in/',
    2: 'https://pmayg.nic.in/',
    3: 'https://pmjay.gov.in/',
    4: 'https://nrega.nic.in/'
  };

  return (
    <div className="services-page">
      <HeroSection 
        title={t('services.title', 'Our Services')} 
        subtitle={t('services.subtitle', 'Comprehensive services and schemes for the welfare of our residents')}
        backgroundImage="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=compress&fit=crop&w=1200&q=80"
      />

      <section className="services-list-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('services.offeredTitle', 'Services Offered')}</h2>
            <p>{t('services.offeredSubtitle', 'The Gram Panchayat is dedicated to providing efficient services to all residents')}</p>
          </div>
          
          <div className="services-grid">
            {services.map(service => (
              <ServiceCard 
                key={service.id}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="service-process-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('services.process.title', 'How to Avail Services')}</h2>
            <p>{t('services.process.subtitle', 'Simple process to access Gram Panchayat services')}</p>
          </div>
          
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>{t('services.process.steps.step1.title', 'Submit Application')}</h3>
                <p>{t('services.process.steps.step1.desc', 'Visit the Panchayat office or use our online portal to submit your application along with required documents.')}</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>{t('services.process.steps.step2.title', 'Verification')}</h3>
                <p>{t('services.process.steps.step2.desc', 'Our team will verify your application and documents as per the service requirements.')}</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>{t('services.process.steps.step3.title', 'Processing')}</h3>
                <p>{t('services.process.steps.step3.desc', 'Your request will be processed within the stipulated timeframe as per service norms.')}</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>{t('services.process.steps.step4.title', 'Service Delivery')}</h3>
                <p>{t('services.process.steps.step4.desc', 'Once approved, collect your certificate/document or avail the service as applicable.')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="schemes-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('services.govSchemes.title', 'Government Schemes')}</h2>
            <p>{t('services.govSchemes.subtitle', 'Information about various welfare schemes available for eligible residents')}</p>
          </div>
          
          <div className="schemes-list">
            {schemes.map(scheme => (
              <div key={scheme.id} className="scheme-card">
                <h3>{scheme.title}</h3>
                <p className="scheme-description">{scheme.description}</p>
                <div className="scheme-details">
                  <div className="scheme-detail">
                    <h4>{t('services.govSchemes.eligibility', 'Eligibility:')}</h4>
                    <p>{scheme.eligibility}</p>
                  </div>
                  <div className="scheme-detail">
                    <h4>{t('services.govSchemes.documents', 'Required Documents:')}</h4>
                    <p>{scheme.documents}</p>
                  </div>
                </div>
                <button className="scheme-btn" onClick={() => window.open(schemeLinks[scheme.id], '_blank', 'noopener,noreferrer')}>{t('services.govSchemes.applyNow', 'Apply Now')}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="service-hours-section">
        <div className="container">
          <div className="service-hours-content">
            <div className="service-hours-text">
              <h2>{t('services.officeHours.title', 'Panchayat Office Hours')}</h2>
              <div className="office-hours">
                <div className="hours-row">
                  <span className="day">{t('services.officeHours.regular', 'Monday - Saturday:')}</span>
                  <span className="time">{t('services.officeHours.time', '10:00 AM - 5:00 PM')}</span>
                </div>
                <div className="hours-row">
                  <span className="day">{t('services.officeHours.lunch', 'Lunch Break:')}</span>
                  <span className="time">{t('services.officeHours.lunchTime', '1:00 PM - 2:00 PM')}</span>
                </div>
                <div className="hours-row">
                  <span className="day">{t('services.officeHours.holidays', 'Sunday & Public Holidays:')}</span>
                  <span className="time">{t('services.officeHours.closed', 'Closed')}</span>
                </div>
              </div>
              <p className="note">
                {t('services.officeHours.note.certificates', '* Certificate services are available from 10:00 AM to 1:00 PM only.')}<br />
                {t('services.officeHours.note.sarpanch', '* Sarpanch meeting hours: Wednesday & Friday, 3:00 PM - 5:00 PM')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="documentation-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('services.docs.title', 'Gram Panchayat Documentation')}</h2>
            <p>{t('services.docs.subtitle', 'Download brochures and important documents or upload your own PDFs.')}</p>
          </div>
          {isAdmin && (
            <div className="docs-upload">
              <input
                type="file"
                accept=".pdf,.csv,.txt"
                multiple
                ref={fileInputRef}
                onChange={handleDocumentUpload}
                style={{ display: 'none' }}
              />
              <button
                className="docs-upload-btn"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {t('services.docs.uploadBtn', 'Upload PDF')}
              </button>
              {uploading && <span className="uploading-msg">{t('services.docs.uploading', 'Uploading...')}</span>}
              {uploadMsg && <span className="upload-success-msg">{uploadMsg}</span>}
            </div>
          )}
          <div className="docs-list">
            {error ? (
              <p className="error-message" style={{ color: '#dc3545', textAlign: 'center', padding: '20px' }}>
                {error}
              </p>
            ) : documents.length === 0 ? (
              <p>{t('services.docs.noDocs', 'No documents uploaded yet.')}</p>
            ) : (
              <ul>
                {Array.isArray(documents) && documents.map((doc, idx) => (
                  <li key={idx}>
                    {getFileIcon(doc.name)}
                    <span className="doc-name">{doc.name}</span>
                    <button
                      className="docs-download-btn"
                      onClick={() => {
                        const a = document.createElement('a');
                        a.href = doc.url;
                        a.download = doc.name;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                      }}
                    >
                      {t('services.docs.download', 'Download')}
                    </button>
                    <button
                      className="docs-preview-btn"
                      onClick={() => handlePreview(doc.url)}
                    >
                      {t('services.docs.preview', 'Preview')}
                    </button>
                    {isAdmin && (
                      <button
                        className="docs-delete-btn"
                        onClick={async () => {
                          await fetch(`http://localhost:5000/documents/${doc.id}`, { method: 'DELETE' });
                          setDocuments(prev => prev.filter(d => d.id !== doc.id));
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
            {previewUrl && (
              <div className="pdf-preview-modal" onClick={closePreview}>
                <div className="pdf-preview-content" onClick={e => e.stopPropagation()}>
                  <button className="pdf-preview-close" onClick={closePreview}>✕</button>
                  <iframe src={previewUrl} title="PDF Preview" width="100%" height="600px" style={{border:0}}></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;