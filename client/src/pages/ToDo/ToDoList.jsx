import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "./ToDo.module.css";
import {
  Button,
  Divider,
  Empty,
  Input,
  Modal,
  Select,
  Tag,
  Tooltip,
  message,
} from "antd";
import { getErrorMessage } from "../../util/GetError";
import { getUserDetails } from "../../util/GetUser";
import ToDoServices from "../../services/toDoServices";
import { useNavigate } from "react-router";
import {
  CheckCircleFilled,
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

function ToDoList() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allToDo, setAllToDo] = useState([]);
  const [currentEditItem, setCurrentEditItem] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [currentTaskType, setCurrentTaskType] = useState("Incomplete");

  const navigate = useNavigate();
  let user = null;

  const getAllTodo = async () => {
    try {
      user = getUserDetails();
      if (user && user.userId) {
        const response = await ToDoServices.list(user?.userId, currentTaskType);
        setAllToDo(response.data);
      }
    } catch (error) {
      console.log(error);
      message.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    getAllTodo();
  }, [currentTaskType]);

  const handleEdit = (item) => {
    console.log(item);
    setCurrentEditItem(item);
    setUpdatedTitle(item?.title);
    setUpdatedDescription(item?.description);
    setUpdatedStatus(item?.isCompleted);
    setIsEditing(true);
  };

  const handleDelete = async (item) => {
    try {
      setLoading(true);

      const response = await ToDoServices.deleteToDo(item._id);

      message.success(response.data);
      getAllTodo();
    } catch (error) {
      console.log(error);
      message.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, isCompleted) => {
    try {
      setLoading(true);
      const data = {
        isCompleted,
      };
      console.log(data);
      const response = await ToDoServices.update(id, data);
      console.log(response.data);
      message.success(`Success!`);
      setLoading(false);
      setIsEditing(false);
      getAllTodo();
    } catch (err) {
      console.log(err);
      setLoading(false);
      message.error(getErrorMessage(err));
    }
  };

  const handleUpdateTask = async () => {
    try {
      setLoading(true);
      const data = {
        title: updatedTitle,
        description: updatedDescription,
        isCompleted: updatedStatus,
      };
      console.log(data);
      const response = await ToDoServices.update(currentEditItem?._id, data);
      console.log(response.data);
      message.success(`${currentEditItem?.title} Updated Successfully!`);
      setLoading(false);
      setIsEditing(false);
      getAllTodo();
    } catch (err) {
      console.log(err);
      setLoading(false);
      message.error(getErrorMessage(err));
    }
  };

  const handleTypeChange = (value) => {
    setCurrentTaskType(value);
  };

  const getFormattedDate = (value) => {
    let date = new Date(value);
    let dateString = date.toLocaleDateString();
    let hh = date.getHours();
    let min = date.getMinutes();
    let ss = date.getSeconds();
    let finalDate = `${dateString} at ${hh}:${min}:${ss}`;
    return finalDate;
  };

  const handleSubmitTask = async () => {
    setLoading(true);
    try {
      const userId = getUserDetails()?.userId;
      const data = {
        title,
        description,
        isCompleted: false,
        createdBy: userId,
      };

      const response = await ToDoServices.create(data);

      getAllTodo();
      message.success("Success");
      setIsAdding(false);
    } catch (error) {
      console.log(error);
      message.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar active={"myTask"} />
      <section className={styles.toDoWrapper}>
        <div className={styles.toDoHeader}>
          <h2>Your tasks</h2>
          <Input style={{ width: "50%" }} placeholder="Search..." />
          <div>
            <Button
              onClick={() => setIsAdding(true)}
              type="primary"
              size="large"
            >
              Create
            </Button>
            <Select
              value={currentTaskType}
              onChange={handleTypeChange}
              style={{ width: "180px", marginLeft: "10px" }}
              options={[
                { value: "Incomplete", label: "Incomplete" },
                { value: "Completed", label: "Completed" },
              ]}
            ></Select>
          </div>
        </div>
        <Divider />

        <div>
          {allToDo.map((item) => {
            return (
              <div key={item?._id} className={styles.toDoCard}>
                <div>
                  <div className={styles.toDoCardHeader}>
                    <h3>{item?.title}</h3>
                    {item?.isCompleted ? (
                      <Tag color="cyan">Completed</Tag>
                    ) : (
                      <Tag color="red">Incomplete</Tag>
                    )}
                  </div>
                  <p>{item?.description}</p>
                </div>

                <div className={styles.toDoCardFooter}>
                  <Tag>{getFormattedDate(item?.createdAt)}</Tag>
                  <div className={styles.toDoFooterAction}>
                    <Tooltip title="Edit Task?">
                      <EditOutlined
                        onClick={() => handleEdit(item)}
                        className={styles.actionIcon}
                      />
                    </Tooltip>
                    <Tooltip title="Delete Task?">
                      <DeleteOutlined
                        onClick={() => handleDelete(item)}
                        style={{ color: "red" }}
                        className={styles.actionIcon}
                      />
                    </Tooltip>
                    {item?.isCompleted ? (
                      <Tooltip title="Mark as Incomplete">
                        <CheckCircleFilled
                          onClick={() => handleUpdateStatus(item._id, false)}
                          style={{ color: "green" }}
                          className={styles.actionIcon}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Mark as Completed">
                        <CheckCircleOutlined
                          onClick={() => handleUpdateStatus(item._id, true)}
                          className={styles.actionIcon}
                        />
                      </Tooltip>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Modal
          confirmLoading={loading}
          title="Add New To Do Task"
          open={isAdding}
          onOk={handleSubmitTask}
          onCancel={() => setIsAdding(false)}
        >
          <Input
            style={{ marginBottom: "1rem" }}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input.TextArea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Modal>

        <Modal
          confirmLoading={loading}
          title={`Update ${currentEditItem.title}`}
          open={isEditing}
          onOk={handleUpdateTask}
          onCancel={() => setIsEditing(false)}
        >
          <Input
            style={{ marginBottom: "1rem" }}
            placeholder="Updated Title"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <Input.TextArea
            style={{ marginBottom: "1rem" }}
            placeholder="Updated Description"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
          <Select
            onChange={(value) => setUpdatedStatus(value)}
            value={updatedStatus}
            options={[
              {
                value: false,
                label: "Not Completed",
              },

              {
                value: true,
                label: "Completed",
              },
            ]}
          />
        </Modal>
      </section>
    </div>
  );
}

export default ToDoList;
