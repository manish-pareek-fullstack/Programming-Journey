import axios from "axios";
import { useEffect, useState } from "react";
import UserImage from "./UserImage";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";

const UserDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setloading] = useState(true);
  const [search, setsearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/users/${id}`)
      .then((res) => {
        setData(res.data);
        setloading(false);
      })
      .catch(() => setloading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!data) return <h2>No Data Found</h2>;

  const match = data.firstName?.toLowerCase().startsWith(search.toLowerCase());

  return (
    <div className="detail-container">
      {/* SEARCH + BACK */}
      <div className="detail-top-bar">
        <input
          type="search"
          placeholder="Search name..."
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />
        <button className="btn-back" onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
      </div>

      {match ? (
        <div className="detail-card">
          {/* ── HERO ── */}
          <div className="detail-card-hero">
            <UserImage id={data.id} />
            <div className="detail-hero-info">
              <h2>
                {data.firstName} {data.lastName}
              </h2>
              <p>
                #{data.id} · {data?.role}
              </p>
            </div>
          </div>

          {/* ── PERSONAL INFO ── */}
          <div className="detail-section">
            <div className="detail-section-title">Personal Info</div>
            <div className="detail-grid">
              <div className="detail-field">
                <div className="field-label">First Name</div>
                <div className="field-value">{data?.firstName}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">Last Name</div>
                <div className="field-value">{data?.lastName}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">Maiden Name</div>
                <div className="field-value">{data?.maidenName}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">Age</div>
                <div className="field-value">{data?.age}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">Gender</div>
                <div className="field-value">{data?.gender}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">Birth Date</div>
                <div className="field-value">{data?.birthDate}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">Blood Group</div>
                <div className="field-value">{data?.bloodGroup}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">Eye Color</div>
                <div className="field-value">{data?.eyeColor}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">Hair Color</div>
                <div className="field-value">{data?.hair?.color}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">Hair Type</div>
                <div className="field-value">{data?.hair?.type}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">Height</div>
                <div className="field-value">{data?.height}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">Weight</div>
                <div className="field-value">{data?.weight}</div>
              </div>
            </div>
          </div>

          {/* ── CONTACT ── */}
          <div className="detail-section">
            <div className="detail-section-title">Contact</div>
            <div className="detail-grid">
              <div className="detail-field">
                <div className="field-label">Email</div>
                <div className="field-value">{data?.email}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">Phone</div>
                <div className="field-value">{data?.phone}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">Username</div>
                <div className="field-value">{data?.username}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">Password</div>
                <div className="field-value">{data?.password}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">IP Address</div>
                <div className="field-value">{data?.ip}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">MAC Address</div>
                <div className="field-value">{data?.macAddress}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">University</div>
                <div className="field-value">{data?.university}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">User Agent</div>
                <div className="field-value">{data?.userAgent}</div>
              </div>
            </div>
          </div>

          {/* ── ADDRESS ── */}
          <div className="detail-section">
            <div className="detail-section-title">Address</div>
            <div className="detail-grid">
              <div className="detail-field">
                <div className="field-label">Street</div>
                <div className="field-value">{data?.address?.address}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">City</div>
                <div className="field-value">{data?.address?.city}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">State</div>
                <div className="field-value">{data?.address?.state}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">State Code</div>
                <div className="field-value">{data?.address?.stateCode}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">Postal Code</div>
                <div className="field-value">{data?.address?.postalCode}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">Country</div>
                <div className="field-value">{data?.address?.country}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">Latitude</div>
                <div className="field-value">
                  {data?.address?.coordinates?.lat}
                </div>
              </div>
              <div className="detail-field">
                <div className="field-label">Longitude</div>
                <div className="field-value">
                  {data?.address?.coordinates?.lng}
                </div>
              </div>
            </div>
          </div>

          {/* ── BANK ── */}
          <div className="detail-section">
            <div className="detail-section-title">Bank</div>
            <div className="detail-grid">
              <div className="detail-field">
                <div className="field-label">Card Number</div>
                <div className="field-value">{data?.bank?.cardNumber}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">Card Type</div>
                <div className="field-value">{data?.bank?.cardType}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">Card Expire</div>
                <div className="field-value">{data?.bank?.cardExpire}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">Currency</div>
                <div className="field-value">{data?.bank?.currency}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">IBAN</div>
                <div className="field-value">{data?.bank?.iban}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">EIN</div>
                <div className="field-value">{data?.ein}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">SSN</div>
                <div className="field-value">{data?.ssn}</div>
              </div>
            </div>
          </div>

          {/* ── COMPANY ── */}
          <div className="detail-section">
            <div className="detail-section-title">Company</div>
            <div className="detail-grid">
              <div className="detail-field">
                <div className="field-label">Company Name</div>
                <div className="field-value">{data?.company?.name}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">Department</div>
                <div className="field-value">{data?.company?.department}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">Title</div>
                <div className="field-value">{data?.company?.title}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">Office Address</div>
                <div className="field-value">
                  {data?.company?.address?.address}
                </div>
              </div>
              <div className="detail-field">
                <div className="field-label">Office City</div>
                <div className="field-value">
                  {data?.company?.address?.city}
                </div>
              </div>
              <div className="detail-field">
                <div className="field-label">Office State</div>
                <div className="field-value">
                  {data?.company?.address?.state}
                </div>
              </div>
              <div className="detail-field">
                <div className="field-label">State Code</div>
                <div className="field-value">
                  {data?.company?.address?.stateCode}
                </div>
              </div>
              <div className="detail-field">
                <div className="field-label">Postal Code</div>
                <div className="field-value">
                  {data?.company?.address?.postalCode}
                </div>
              </div>
              <div className="detail-field">
                <div className="field-label">Lat</div>
                <div className="field-value">
                  {data?.company?.address?.coordinates?.lat}
                </div>
              </div>
              <div className="detail-field">
                <div className="field-label">Lng</div>
                <div className="field-value">
                  {data?.company?.address?.coordinates?.lng}
                </div>
              </div>
              <div className="detail-field">
                <div className="field-label">Country</div>
                <div className="field-value">{data?.company?.country}</div>
              </div>
            </div>
          </div>

          {/* ── CRYPTO ── */}
          <div className="detail-section">
            <div className="detail-section-title">Crypto</div>
            <div className="detail-grid">
              <div className="detail-field">
                <div className="field-label">Coin</div>
                <div className="field-value">{data?.crypto?.coin}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">Wallet</div>
                <div className="field-value">{data?.crypto?.wallet}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">Network</div>
                <div className="field-value">{data?.crypto?.network}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="no-data-state">
          <div className="no-data-icon">🔍</div>
          <h2>No Match Found</h2>
          <p>Try a different name to search.</p>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
