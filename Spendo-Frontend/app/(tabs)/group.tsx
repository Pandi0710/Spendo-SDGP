import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useGroup } from "../../context/GroupContext";
import { fetchUsers } from "../../services/Authservice";
import {
  addMemberToGroup,
  fetchGroupDetails,
} from "../../services/GroupService";
import Modal from "react-native-modal";
import { BlurView } from "expo-blur";

export default function GroupScreen() {
  const router = useRouter();
  const { groups, createNewGroup, refreshGroups } = useGroup();
  const [modalVisible, setModalVisible] = useState(false);
  const [addMemberModalVisible, setAddMemberModalVisible] = useState(false);
  const [viewMembersModalVisible, setViewMembersModalVisible] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [users, setUsers] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    refreshGroups();
  }, []);

  const filteredUsers = users.filter((user: any) => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fetch users for adding members
  const loadUsers = async () => {
    try {
      setLoading(true);
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      Alert.alert("Error", "Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Open the Add Member modal
  const openAddMemberModal = async (groupId: string) => {
    setSelectedGroupId(groupId);
    setAddMemberModalVisible(true);
    await loadUsers();
  };

  // Add user to group
  const handleAddMember = async () => {
    if (!selectedUserId) {
      Alert.alert("Error", "Please select a user to add.");
      return;
    }

    try {
      setLoading(true);
      await addMemberToGroup(selectedGroupId, selectedUserId);
      Alert.alert("Success", "Member added successfully!");
      setAddMemberModalVisible(false);
      setSelectedUserId("");
      refreshGroups();
    } catch (error) {
      Alert.alert("Error", "Failed to add member. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Open the View Members modal
  const openViewMembersModal = async (groupId: string) => {
    setSelectedGroupId(groupId);
    try {
      setLoading(true);
      const groupDetails = await fetchGroupDetails(groupId);
      setGroupMembers(groupDetails.members);
    } catch (error) {
      console.error("Error fetching group members:", error);
      Alert.alert("Error", "Failed to load group members. Please try again.");
    } finally {
      setLoading(false);
      setViewMembersModalVisible(true);
    }
  };

  const renderGroupItem = ({ item }: { item: any }) => (
    <View style={styles.groupCard}>
      <TouchableOpacity 
        style={styles.groupHeader}
        onPress={() => router.push(`/(tabs)/singleView/${item._id}`)}
      >
        <View style={styles.groupIcon}>
          <Text style={styles.groupIconText}>{item.name.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.groupTitle}>{item.name}</Text>
      </TouchableOpacity>
      
      <View style={styles.groupActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => openAddMemberModal(item._id)}
        >
          <Ionicons name="person-add" size={20} color="white" />
          <Text style={styles.actionButtonText}>Add</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => openViewMembersModal(item._id)}
        >
          <Ionicons name="people" size={20} color="white" />
          <Text style={styles.actionButtonText}>Members</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#e1e8df" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Groups</Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={24} color="white" />
          <Text style={styles.createButtonText}>New Group</Text>
        </TouchableOpacity>
      </View>

      {groups.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="people-outline" size={70} color="#7e9279" />
          <Text style={styles.emptyStateText}>No groups yet</Text>
          <Text style={styles.emptyStateSubtext}>
            Create a new group to get started
          </Text>
        </View>
      ) : (
        <FlatList
          data={groups}
          renderItem={renderGroupItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Modal for Creating Group */}
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.modal}
      >
        <BlurView intensity={10} style={styles.blurContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New Group</Text>
            
            <View style={styles.inputContainer}>
              <Ionicons name="people" size={24} color="#7e9279" />
              <TextInput
                style={styles.input}
                placeholder="Enter group name"
                value={groupName}
                onChangeText={setGroupName}
                autoFocus
              />
            </View>
            
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setModalVisible(false);
                  setGroupName("");
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={() => {
                  if (groupName.trim()) {
                    createNewGroup(groupName);
                    setModalVisible(false);
                    setGroupName("");
                  } else {
                    Alert.alert("Error", "Please enter a group name");
                  }
                }}
              >
                <Text style={styles.saveButtonText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </Modal>

      {/* Modal for Adding Member */}
      <Modal
        isVisible={addMemberModalVisible}
        onBackdropPress={() => setAddMemberModalVisible(false)}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Member</Text>
          
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#7e9279" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search users..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          
          {loading ? (
            <ActivityIndicator size="large" color="#7e9279" style={styles.loader} />
          ) : (
            <FlatList
              data={filteredUsers}
              keyExtractor={(item: any) => item._id}
              style={styles.usersList}
              renderItem={({ item }: { item: any }) => (
                <TouchableOpacity
                  style={[
                    styles.userItem,
                    selectedUserId === item._id && styles.selectedUser,
                  ]}
                  onPress={() => setSelectedUserId(item._id)}
                >
                  <View style={styles.userAvatar}>
                    <Text style={styles.userAvatarText}>
                      {item.name.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <Text style={styles.userName}>{item.name}</Text>
                  {selectedUserId === item._id && (
                    <Ionicons name="checkmark-circle" size={24} color="#4b6652" />
                  )}
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={styles.emptyListText}>
                  No users found. Try a different search.
                </Text>
              }
            />
          )}
          
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => {
                setAddMemberModalVisible(false);
                setSelectedUserId("");
                setSearchQuery("");
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.modalButton,
                styles.saveButton,
                !selectedUserId && styles.disabledButton,
              ]}
              onPress={handleAddMember}
              disabled={!selectedUserId}
            >
              <Text style={styles.saveButtonText}>Add Member</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal for Viewing Members */}
      <Modal
        isVisible={viewMembersModalVisible}
        onBackdropPress={() => setViewMembersModalVisible(false)}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Group Members</Text>
          
          {loading ? (
            <ActivityIndicator size="large" color="#7e9279" style={styles.loader} />
          ) : (
            <FlatList
              data={groupMembers}
              keyExtractor={(item: any) => item._id}
              style={styles.usersList}
              renderItem={({ item }: { item: any }) => (
                <View style={styles.memberItem}>
                  <View style={styles.userAvatar}>
                    <Text style={styles.userAvatarText}>
                      {item.name.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <Text style={styles.userName}>{item.name}</Text>
                </View>
              )}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <Ionicons name="people-outline" size={50} color="#7e9279" />
                  <Text style={styles.emptyStateText}>No members yet</Text>
                </View>
              }
            />
          )}
          
       
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Enhanced Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e1e8df",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingVertical: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4b6652",
  },
  createButton: {
    backgroundColor: "#7e9279",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    elevation: 2,
  },
  createButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 4,
  },
  listContainer: {
    paddingBottom: 20,
  },
  groupCard: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  groupHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  groupIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4b6652",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  groupIconText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  groupActions: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    backgroundColor: "#7e9279",
  },
  actionButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 6,
  },
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  blurContainer: {
    overflow: "hidden",
    borderRadius: 24,
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4b6652",
    marginBottom: 16,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 8,
    fontSize: 16,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  saveButton: {
    backgroundColor: "#7e9279",
  },
  cancelButton: {
    backgroundColor: "#f2f2f2",
  },
  closeButton: {
    backgroundColor: "#7e9279",
    marginTop: 16,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelButtonText: {
    color: "#666",
    fontWeight: "bold",
    fontSize: 16,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    marginLeft: 8,
    fontSize: 16,
  },
  usersList: {
    maxHeight: 300,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  selectedUser: {
    backgroundColor: "#d0e7d2",
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#7e9279",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  userAvatarText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  userName: {
    fontSize: 16,
    flex: 1,
  },
  memberItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4b6652",
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
  },
  loader: {
    marginVertical: 20,
  },
  emptyListText: {
    textAlign: "center",
    padding: 16,
    color: "#666",
  },
  disabledButton: {
    backgroundColor: "#a5b5a3",
    opacity: 0.7,
  },
});