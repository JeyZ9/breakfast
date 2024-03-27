import React, { useState } from "react";
import { useTickets } from "../contexts/TicketsContext";
import { useCustomer } from "../contexts/CustomerContext";

function ProfileEdit({ country, customerList, formData, setFormData }) {
  const [flipProfile, setFlipProfile] = useState(false);
  const { formatDateTime } = useTickets();
  const { updateCustomer } = useCustomer();
  // const navigate = useNavigate()

  
  // console.log("TEST FORM DATA: ", formData);

  const handleFlipProfile = () => {
    setFlipProfile(!flipProfile);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    try {
      if (customerList.length > 0) {
        const customerId = customerList[0].customerId;
        await updateCustomer(customerId, formData);
        setFlipProfile(false);
        // navigate('/profile/myprofile')
      } else {
        console.error("No customer data found.");
      }
    } catch (error) {
      console.error("Error updating customer profile:", error);
    }
  };

  // console.log("CustomerList Log: ", customerList);

  return (
    <>
      <div className="mx-10 my-20 text-gray-600 flex flex-col gap-y-4">
        <h1 className="text-2xl font-bold">My Profile</h1>
        {customerList.length > 0 ? (
          <div className="bg-white p-5 text-gray-500 rounded-[5px]">
            {/* {customerList.map((customer, index) => ( */}
            <div>
              {!flipProfile ? (
                <div>
                  <div className="flex border-b gap-x-5 pb-5">
                    {/* Profile image */}
                    <div className="w-[4em] h-[4em]">
                      <div className="w-[4em] h-[4em] rounded-full bg-orange-500 flex items-center justify-center">
                        <p className="text-2xl font-semibold text-white">
                          {formData.firstName && formData.firstName.substring(2,-2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <div className="">
                        <p className="text-xs">Name</p>
                        <h3 className="text-sm text-gray-600 font-semibold">
                          {!formData.firstName || formData.firstName === ""
                            ? "-"
                            : `${formData.firstName}`}
                        </h3>
                      </div>
                      <div className="">
                        <button
                          onClick={handleFlipProfile}
                          className="border-2 rounded-[5px] px-4 py-2 text-orange-500 border-orange-500 font-semibold text-xs hover:text-white hover:bg-orange-500 transition-all"
                        >
                          Edit Profile
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5 pt-5">
                    <div className="">
                      <p className="text-xs">First name</p>
                      <h3 className="text-sm text-gray-600 font-semibold">
                        {!formData.firstName || formData.firstName === ""
                          ? "-"
                          : `${formData.firstName}`}
                      </h3>
                    </div>
                    <div className="">
                      <p className="text-xs">Last name</p>
                      <h3 className="text-sm text-gray-600 font-semibold">
                        {!formData.lastName || formData.lastName === ""
                          ? "-"
                          : `${formData.lastName}`}
                      </h3>
                    </div>
                    <div className="">
                      <p className="text-xs">Email</p>
                      <h3 className="text-sm text-gray-600 font-semibold">
                        {!formData.email || formData.email === ""
                          ? "-"
                          : `${formData.email}`}
                      </h3>
                    </div>
                    <div className="">
                      <p className="text-xs">Phone number</p>
                      <h3 className="text-sm text-gray-600 font-semibold">
                        {!formData.number || formData.number === ""
                          ? "-"
                          : `${formData.number}`}
                      </h3>
                    </div>
                    <div className="">
                      <p className="text-xs">Nationality</p>
                      <h3 className="text-sm text-gray-600 font-semibold">
                        {!formData.nationality || formData.nationality === ""
                          ? "-"
                          : `${formData.nationality}`}
                      </h3>
                    </div>
                    <div className="">
                      <p className="text-xs">Date Of birth</p>
                      <h3 className="text-sm text-gray-600 font-semibold">
                        {!formData.dateOfBirth || formData.dateOfBirth === ""
                          ? "-"
                          : `${formatDateTime(formData.dateOfBirth)}`}
                      </h3>
                    </div>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleEditProfile}
                  method="post"
                  className="flex flex-col gap-y-10"
                >
                  <div className="grid grid-cols-2 gap-5">
                    <label className="w-full">
                      <p className="text-xs">First Name</p>
                      <input
                        name="firstName"
                        className="w-full text-sm text-gray-600 font-semibold border-b focus:outline-none border-gray-400 focus:bg-none hover:border-orange-400 bg-transparent"
                        type="text"
                        value={formData.firstName || ""}
                        onChange={handleInputChange}
                      />
                    </label>
                    <label className="w-full">
                      <p className="text-xs">Last Name</p>
                      <input
                        name="lastName"
                        className="w-full text-sm text-gray-600 font-semibold border-b focus:outline-none border-gray-400 focus:bg-none hover:border-orange-400 bg-transparent"
                        type="text"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </label>
                    <label htmlFor="">
                      <p className="text-xs">Nationality</p>
                      <select
                        name="nationality"
                        id=""
                        value={formData.nationality}
                        onChange={handleInputChange}
                        className="w-full text-sm text-gray-600 font-semibold border-b focus:outline-none border-gray-400 focus:bg-none hover:border-orange-400 bg-transparent"
                      >
                        {country.map((item) => (
                          <option key={item.common} value={item.common}>
                            {item.common}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label htmlFor="">
                      <p className="text-xs">Phone number</p>
                      <input
                        name="number"
                        className="w-full text-sm text-gray-600 font-semibold border-b focus:outline-none border-gray-400 focus:bg-none hover:border-orange-400 bg-transparent"
                        type="text"
                        value={formData.number}
                        onChange={handleInputChange}
                      />
                    </label>
                    <label htmlFor="">
                      <p className="text-xs">Date of birth</p>
                      <input
                        name="dateOfBirth"
                        className="w-full text-sm text-gray-600 font-semibold border-b focus:outline-none border-gray-400 focus:bg-none hover:border-orange-400 bg-transparent"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                      />
                    </label>
                    {/* Rest of the form fields */}
                  </div>
                  <div className="flex gap-x-2 justify-end">
                    <button
                      className="bg-orange-50 w-24 py-2  text-gray-600 rounded-[5px] text-sm font-semibold hover:bg-orange-200"
                      onClick={() => handleFlipProfile()}
                    >
                      Cancel
                    </button>
                    {/* <Link to={`/profile/myprofile`}> */}
                      <button
                        className="bg-orange-400 w-24 py-2  text-white rounded-[5px] text-sm font-semibold hover:bg-orange-700"
                        type="submit"
                      >
                        Save
                      </button>
                    {/* </Link> */}
                  </div>
                </form>
              )}
            </div>
            {/* ))} */}
          </div>
        ) : (
          <p>Loading customer data...</p>
        )}
      </div>
    </>
  );
}

export default ProfileEdit;
