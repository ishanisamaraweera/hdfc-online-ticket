import { LeftOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Radio, Row, Select, Divider, Progress, Slider, List } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useBreadCrumb from "../../hooks/useBreadCrumb";
import { apis } from "../../properties";
import axios from "axios";
import { useStore } from "../../store";
import { } from "antd";

const { Option } = Select;

function ViewTicket() {
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [desData, setDesData] = useState();
  const [statuses, setStatuses] = useState([]);
  const [issueTypes, setIssueTypes] = useState([]);
  const [emergencyLevels, setEmergencyLevels] = useState([]);
  const [locations, setLocations] = useState([]);
  const [branchDivisions, setBranchDivisions] = useState([]);
  const [branchDivisionMap, setBranchDivisionMap] = useState({});
  const [issueCategories, setIssueCategories] = useState([]);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const { actionPrivileges } = useStore();
  const [completedPercentage, setCompletedPercentage] = useState(50);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [agentComment, setAgentComment] = useState("");


  const handleSliderChange = (value) => {
    setCompletedPercentage(value);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const commentData = {
        addedBy: localStorage.getItem("username"),
        ticketId: id,
        comment: newComment.trim(),
      };

      try {
        console.log("***************" + JSON.stringify(commentData));
        const response = axios.post('http://localhost:8080/addComment', commentData);
          
        setComments([...comments, <span key={comments.length}><strong>{displayName}:</strong> {newComment.trim()}</span>]);
        setNewComment("");
        message.success("Comment added successfully");
      } catch (error) {
        message.error("Failed to add comment");
        console.error("Error adding comment:", error);
      }
    } else {
      message.warning("Please enter a comment before adding.");
    }
  };

  useBreadCrumb("View Ticket", location.pathname, "", "add");

  useEffect(() => {
    fetchTicketDetails();
    fetchCommentDetails();
    fetchStatuses();
    fetchLocations();
    fetchBranchDivisions();
    fetchEmergencyLevels();
    fetchIssueTypes();
    fetchIssueCategories();
    fetchAllIssueCategories();
    fetchAgents();
    fetchDisplayName();
  }, [id]);


  const fetchDisplayName = async () => {
    const username = localStorage.getItem("username");
    try {
      const response = await axios.get(`http://localhost:8080/getDisplayNameByUsername/${username}`);
      setDisplayName(response.data);
    } catch (error) {
      console.error('Error fetching display name:', error);
    }
  };

  const fetchStatuses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getStatuses');
      setStatuses(response.data);
    } catch (error) {
      console.error('Error fetching statuses:', error);
    }
  };

  const fetchEmergencyLevels = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/getEmergencyLevels`);
      setEmergencyLevels(response.data);
    } catch (error) {
      message.error("Failed to load emergency levels");
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getLocations');
      setLocations(response.data);
    } catch (error) {
      message.error("Failed to load locations");
    }
  };

  const fetchBranchDivisions = async (locationId) => {
    try {
      const response = await axios.get(`http://localhost:8080/getBranchDivisionByLocation/${locationId}`);
      const branchDivisionsData = response.data;
      const branchDivisionMap = branchDivisionsData.reduce((acc, branchDivision) => {
        acc[branchDivision.branchDivisionId] = branchDivision.branchDivisionDes;
        return acc;
      }, {});
      setBranchDivisions(branchDivisionsData);
      setBranchDivisionMap(branchDivisionMap);
    } catch (error) {
      message.error("Failed to load branch divisions");
    }
  };

  const fetchIssueTypes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getIssueTypes');
      setIssueTypes(response.data);
    } catch (error) {
      message.error("Failed to load issue types");
    }
  };

  const fetchIssueCategories = async (issueTypeId) => {
    try {
      const response = await axios.get(`http://localhost:8080/getIssueCategoriesByIssueType/${issueTypeId}`);
      setIssueCategories(response.data);
    } catch (error) {
      // message.error("Failed to load issue categories");
    }
  };

  const fetchAllIssueCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getAllIssueCategories");
      setIssueCategories(response.data);
    } catch (error) {
      //message.error("Failed to load issue categories");
    }
  };

  const fetchAgents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getUserListsByUserRole/AGENT');
      setAgents(response.data);
    } catch (error) {
      message.error("Failed to load agents");
    }
  };

  const fetchTicketDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/getTicketByID/${id}`);
      const ticket = response.data;
      console.log(ticket);
      form.setFieldsValue({
        ticketId: ticket.ticketId,
        emergencyLevel: ticket.emergencyLevel,
        location: ticket.location,
        branchDivision: ticket.branchDivision,
        issueType: ticket.issueType,
        issueCategory: ticket.issueCategory,
        status: ticket.status,
        contactNo: ticket.contactNo,
        serialNo: ticket.serialNo,
        isWorkingPc: ticket.isWorkingPc,
        ip: ticket.ip,
        issueDesAndRemarks: ticket.issueDesAndRemarks,
        agent: ticket.agent,
        completedPercentage: ticket.completedPercentage,
        agentComment: ticket.agentComment,
      });
      setDesData(ticket.issueDesAndRemarks);
      fetchIssueCategories(ticket.issueType);
      fetchBranchDivisions(ticket.location);
      setCompletedPercentage(ticket.completedPercentage);
    } catch (error) {
      message.error("Failed to load ticket details");
    }
  };

  const fetchCommentDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/getCommentsByTicketId/${id}`);
      const commentsData = response.data;
      setComments(commentsData.map(comment => (
        <span key={comment.id}>
          <strong>{comment.addedBy}:</strong> {comment.comment}
        </span>
      )));
  
    } catch (error) {
      message.error("Failed to load ticket details");
    }
  };

  const onFinishFailed = () => {
    message.error("Please fill all the details");
  };

  const submitForm = () => {

    form.validateFields().then((values) => {
      const data = {
        ...values,
        description: desData,
        currency: "USD",
        // slug: values.slug.trim()
      };
      axios.put("http://localhost:8080/updateTicket", data)
        .then((result) => {
          console.log(result.data);
          setDesData("");
          form.resetFields();
          message.success(result.data.message);
        })
        .catch((error) => {
          message.error(error.response.data.message);
        });
    });
  };

  const handleAssign = () => {
    if (selectedAgent) {
      axios.put(`http://localhost:8080/assignTicket/${id}`, { agentId: selectedAgent, username: localStorage.getItem("username") })
        .then((response) => {
          message.success("Ticket successfully assigned");
        })
        .catch((error) => {
          message.error("Failed to assign ticket");
        });
    } else {
      message.warning("Please select an agent");
    }
  };

  const acceptTicket = () => {
    form.validateFields(['agentComment']).then(() => {
      const agentComment = form.getFieldValue('agentComment');
      axios.put(`http://localhost:8080/acceptTicket/${id}`, { username: localStorage.getItem("username"), agentComment })
        .then((response) => {
          message.success("Ticket successfully accepted");
        })
        .catch((error) => {
          message.error("Failed to accept ticket");
        });
    });
  };

  const rejectTicket = () => {
    form.validateFields(['agentComment']).then(() => {
      const agentComment = form.getFieldValue('agentComment');
      axios.put(`http://localhost:8080/rejectTicket/${id}`, { username: localStorage.getItem("username"), agentComment })
        .then((response) => {
          message.success("Ticket successfully rejected");
        })
        .catch((error) => {
          message.error("Failed to reject ticket");
        });
    });
  };


  const savePercentage = () => {
    axios.put(`http://localhost:8080/savePercentage/${id}`, { completedPercentage: completedPercentage, username: localStorage.getItem("username") })
      .then((response) => {
        message.success("Completed percentage successfully updated");
      })
      .catch((error) => {
        message.error("Failed to update completed percentage");
      });
  };

  const saveStatus = () => {
    axios.put(`http://localhost:8080/saveStatus/${id}`, { username: localStorage.getItem("username") })
      .then((response) => {
        message.success("Ticket status succesfully updated");
      })
      .catch((error) => {
        message.error("Failed to update ticket status");
      });
  };

  return (
    <div className="dashboard">
      <div className="section_row">
        <div className="com_head">
          <LeftOutlined onClick={() => navigate(-1)} />
          <p className="common_header">View Ticket</p>
        </div>
        <Form
          autoComplete="off"
          form={form}
          onFinish={submitForm}
          onFinishFailed={onFinishFailed}
          initialValues={{ remember: true }}
          layout="vertical"
        >
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Ticket ID"
                name="ticketId"
              >
                <Input type="text" size="large" placeholder="Ticket ID" readOnly />
              </Form.Item>
              <Form.Item
                label="Emergency Level"
                name="emergencyLevel"
              >
                <Select
                  allowClear
                  placeholder="Select Emergency Level"
                  size="large" disabled
                >
                  {emergencyLevels.map(level => (
                    <Option key={level.levelId} value={level.levelId}>
                      {level.levelDes}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Location"
                name="location"
              >
                <Select allowClear placeholder="Select Location" size="large" disabled>
                  {locations.map(location => (
                    <Option key={location.locationId} value={location.locationId}>
                      {location.locationDes}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Branch/Division"
                name="branchDivision"
              >
                <Select
                  allowClear
                  placeholder="Select Branch/Division"
                  size="large" disabled
                >
                  {branchDivisions.map(branchDivision => (
                    <Option key={branchDivision.branchDivisionId} value={branchDivision.branchDivisionId}>
                      {branchDivision.branchDivisionDes}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Issue Type"
                name="issueType"
              >
                <Select allowClear placeholder="Select Issue Type" size="large" disabled>
                  {issueTypes.map(issueTypes => (
                    <Option key={issueTypes.issueTypeId} value={issueTypes.issueTypeId}>
                      {issueTypes.issueTypeDes}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Issue Category"
                name="issueCategory" readOnly
              >
                <Select
                  allowClear
                  placeholder="Select Issue Category"
                  size="large" disabled
                >
                  {issueCategories.map(category => (
                    <Option key={category.issueCategoryId} value={category.issueCategoryId}>
                      {category.issueCategoryDes}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Status"
                name="status" readOnly
              >
                <Select allowClear placeholder="Select Status" size="large" disabled >
                  {statuses.map(status => (
                    <Option key={status.statusId} value={status.statusId}>
                      {status.statusDes}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Contact No"
                name="contactNo" readOnly
              >
                <Input type="text" size="large" placeholder="Contact No" readOnly />
              </Form.Item>
              <Form.Item label="Serial No" name="serialNo"  >
                <Input type="text" size="large" placeholder="Serial No" readOnly />
              </Form.Item>
              <Form.Item label="PC Type" name="isWorkingPc" readOnly>
                <Radio.Group  >
                  <Radio value="Yes" disabled >Working PC </Radio>
                  <Radio value="No" disabled >Another PC</Radio>
                </Radio.Group>

              </Form.Item>
              <Form.Item
                label="IP Address"
                name="ip"
              >
                <Input type="text" size="large" placeholder="IP Address" readOnly />
              </Form.Item>
              <Form.Item
                label="Issue Description and Remarks"
                name="issueDesAndRemarks"
              >
                <TextArea rows={4} placeholder="Type here ..." readOnly />
              </Form.Item>
            </Col>

            <Col span={12}>
              {actionPrivileges.includes("ASSIGN_TICKET") && (
                <>
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item
                        label="Agent"
                        name="agent"
                      >
                        <Select
                          allowClear
                          placeholder="Select Agent"
                          size="large"
                          onChange={value => setSelectedAgent(value)}
                        >
                          {agents.map(agent => (
                            <Option key={agent.username} value={agent.username}>
                              {agent.displayName}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Button
                        type="primary"
                        onClick={handleAssign}
                        style={{ marginTop: '32px' }}
                      >
                        Assign
                      </Button>
                    </Col>
                  </Row>
                </>
              )}

              {actionPrivileges.includes("ACCEPT_TICKET") && (
                <>
                  <Divider />
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item
                        label="Agent Comment"
                        name="agentComment"
                      >
                        <TextArea rows={4} placeholder="Type here ..." value={agentComment} onChange={(e) => {
                          setAgentComment(e.target.value);
                          form.setFieldValue({ agentComment: e.target.value })
                        }} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item>
                        <Button
                          type="primary"
                          onClick={acceptTicket}
                          style={{ marginTop: '32px' }}
                        >
                          Accept
                        </Button>
                      </Form.Item>
                      <Form.Item>
                        <Button
                          type="primary"
                          onClick={rejectTicket}
                        >
                          Reject
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Divider />
                </>
              )}

              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="Completed Percentage"
                    name="completedPercentage"
                  >
                    <div style={{ width: "300px" }}>
                      <Progress
                        percent={completedPercentage}
                        strokeColor="#000000"
                        trailColor="#f0f0f0"
                      />
                      <Slider
                        value={completedPercentage}
                        onChange={handleSliderChange}
                        min={0}
                        max={100}
                        style={{ marginTop: "20px", width: "250px" }}
                      />
                    </div>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  {actionPrivileges.includes("UPDATE_TICKET") && (
                    <Form.Item>
                      <Button
                        type="primary"
                        onClick={savePercentage}
                        style={{ marginTop: '32px' }}
                      >
                        Save
                      </Button>
                      <Button
                        type="primary"
                        onClick={saveStatus}
                        style={{ marginTop: '32px', marginLeft: '12px' }}
                      >
                        Completed
                      </Button>
                    </Form.Item>
                  )}
                </Col>
              </Row>

              {/* Comment Section */}
              <Form.Item label="Add Comment" name="newComment">
                <TextArea
                  rows={4}
                  placeholder="Type your comment here..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <Button type="primary" onClick={handleAddComment} style={{ marginTop: "10px" }}>
                  Add Comment
                </Button>
              </Form.Item>

              {/* List of Comments */}
              <Divider>Comments</Divider>
              <List
                bordered
                dataSource={comments}
                renderItem={(item) => (
                  <List.Item>
                    {item}
                  </List.Item>
                )}
              />


              <div className="left_btn" style={{ display: 'flex', gap: '10px' }}>
                <Button type="secondary" className="secondary__btn" htmlType="back">
                  <a href='http://localhost:3000/tickets' style={{ color: 'black', textDecoration: 'none' }}>
                    Back
                  </a>
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div >
    </div >
  );
}

export default ViewTicket;