import React from 'react'
import { FaPeopleGroup } from "react-icons/fa6";
import { MdHowToVote } from "react-icons/md";
import { GiVendingMachine } from "react-icons/gi";
import DataTable from '../../Atoms/DataTable';
import { useDispatch, useSelector } from 'react-redux';




const Dashboard = () => {


  const dispatch = useDispatch()

  const partyData = useSelector((state) => state.adminReducer.party);
  const electiondata = useSelector((state) => state.adminReducer.election);
  const userdata = useSelector((state) => state.adminReducer.user);
  const votes = useSelector((state) => state.adminReducer.vote);
  const isLoading = useSelector((state) => state.adminReducer.isLoading);
  const error = useSelector((state) => state.adminReducer.error);

  function calculatePartyVotes(data) {
    const partyVotes = {};
    // Filter out entries where the user has voted for a party
    const votedEntries = data.filter(
      (entry) => entry.party !== null && entry.election !== null
    );
    // Iterate over voted entries
    votedEntries.forEach((entry) => {
      const { party } = entry;
      if (party.party_name in partyVotes) {
        partyVotes[party.party_name]++;
      } else {
        partyVotes[party.party_name] = 1;
      }
    });
    return partyVotes;
  }

  const partyVotes = calculatePartyVotes(votes);
  // // Sample column data
  const columns = [
    {
      id: "img",
      label: "Party Logo",
      minWidth: 170,
      align: "center",
    },
    {
      id: "PartyName",
      label: "Party Name",
      minWidth: 170,
      align: "center",
    },
    {
      id: "PartySCode",
      label: "Party Short-Code",
      minWidth: 170,
      align: "center",
    },
    {
      id: "votes",
      label: "votes",
      minWidth: 170,
      align: "center",
    }
  ];

  // Sample row data
  const rows = partyData?.map((party) => ({
    id: party._id,
    PartyName : party.party_name,
    img : party.party_logo,
    PartySCode: party.short_code,
    votes: partyVotes[party.party_name] || 0,
  }));
  // Function to handle form submission for adding election
  const handleSubmit = (formData) => {
    console.log(formData);
  };

  // Function to handle deletion of election
  const handleDelete = (id) => {
    console.log(id);
  };

  // Dummy function for handling update (not implemented)
  const handleUpdate = () => {
    console.log("Update");
  };
  return (

    <div>

      <main class="py-6 bg-surface-secondary">
        <div class="row g-6 mb-6">
          <div class="col-xl-4 col-sm-6 col-12">
            <div class="card shadow border-0">
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <span class="h6 font-semibold text-muted text-sm d-block mb-2">Total Party</span>
                    <span class="h3 font-bold mb-0">{partyData?.length}</span>
                  </div>
                  <div class="col-auto">
                    <div class="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                      <FaPeopleGroup />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="col-xl-4 col-sm-6 col-12">
            <div class="card shadow border-0">
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <span class="h6 font-semibold text-muted text-sm d-block mb-2">Total Election</span>
                    <span class="h3 font-bold mb-0">{electiondata?.length}</span>
                  </div>
                  <div class="col-auto">
                    <div class="icon icon-shape bg-primary text-white text-lg rounded-circle">
                      <GiVendingMachine />

                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div class="col-xl-4 col-sm-6 col-12">
            <div class="card shadow border-0">
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <span class="h6 font-semibold text-muted text-sm d-block mb-2">Total Voters</span>
                    <span class="h3 font-bold mb-0">{userdata?.length}</span>
                  </div>
                  <div class="col-auto">
                    <div class="icon icon-shape bg-info text-white text-lg rounded-circle">
                      <MdHowToVote />

                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </main>
      <DataTable
        columns={columns}
        rows={rows}
        height={450}
      />

    </div>
  )
}

export default Dashboard
