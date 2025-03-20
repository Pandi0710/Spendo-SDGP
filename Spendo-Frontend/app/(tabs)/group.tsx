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
import Modal from "react-native-modal";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useGroup } from "../../context/GroupContext";
import { fetchUsers, fetchGroupDetails, addMemberToGroup } from "../../services/GroupService";

export default function GroupScreen() {
  const router = useRouter();
  const { groups, createNewGroup, refreshGroups } = useGroup();
  const [modalVisible, setModalVisible] = useState(false);
  const [addMemberModalVisible, setAddMemberModalVisible] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    refreshGroups();
  }, []);

  // Fetch users for adding members
  const loadUsers = async () => {
    try {
      setLoading(true);
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      Alert.alert("Error", "Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Open the Add Member modal
  const openAddMemberModal = async (groupId) => {
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

  // Create new group
  const handleCreateGroup = () => {
    if (!groupName.trim()) {
      Alert.alert("Error", "Please enter a group name.");
      return;
    }

    createNewGroup(groupName);
    Alert.alert("Success", "Group created successfully!");
    setModalVisible(false);
    setGroupName("");
    refreshGroups();
  };

  const renderGroupItem = ({ item }) => (
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
          onPress={() => router.push(`/(tabs)/membersView/${item._id}`)}
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
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleCreateGroup}
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
              data={users.filter(user => 
                user.name.toLowerCase().includes(searchQuery.toLowerCase())
              )}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.userItem,
                    selectedUserId === item._id && styles.selectedUser,
                  ]}
                  onPress={() => setSelectedUserId(item._id)}
                >
                  <View style={styles.userAvatar}>
                    <Text style={styles.userAvatarText}>{item.name.charAt(0).toUpperCase()}</Text>
                  </View>
                  <Text style={styles.userName}>{item.name}</Text>
                  {selectedUserId === item._id && (
                    <Ionicons name="checkmark-circle" size={24} color="#4b6652" />
                  )}
                </TouchableOpacity>
              )}
            />
          )}
          
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => {
                setAddMemberModalVisible(false);
                setSelectedUserId("");
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.modalButton, styles.saveButton]}
              onPress={handleAddMember}
            >
              <Text style={styles.saveButtonText}>Add Member</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e1e8df", paddingHorizontal: 10 },
  header: { flexDirection: "row", justifyContent: "space-between", marginVertical: 10 },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#4b6652" },
  createButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#4b6652", borderRadius: 6, padding: 10 },
  createButtonText: { color: "white", marginLeft: 6, fontSize: 16 },
  emptyState: { flex: 1, justifyContent: "center", alignItems: "center", marginTop: 50 },
  emptyStateText: { fontSize: 20, color: "#7e9279", marginTop: 10 },
  emptyStateSubtext: { color: "#a9b7a8", textAlign: "center", marginTop: 6 },
  listContainer: { paddingBottom: 30 },
  groupCard: { backgroundColor: "white", marginVertical: 10, padding: 15, borderRadius: 8, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 },
  groupHeader: { flexDirection: "row", alignItems: "center" },
  groupIcon: { backgroundColor: "#4b6652", padding: 10, borderRadius: 50, marginRight: 12 },
  groupIconText: { color: "white", fontSize: 18, fontWeight: "bold" },
  groupTitle: { fontSize: 18, fontWeight: "bold", color: "#4b6652" },
  groupActions: { flexDirection: "row", marginTop: 10 },
  actionButton: { flexDirection: "row", alignItems: "center", backgroundColor: "#7e9279", padding: 10, borderRadius: 6, marginRight: 10 },
  actionButtonText: { color: "white", marginLeft: 6 },
  modal: { justifyContent: "center", alignItems: "center" },
  blurContainer: { padding: 20, borderRadius: 8 },
  modalContent: { backgroundColor: "white", padding: 20, borderRadius: 8, width: "100%" },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 20, color: "#4b6652", textAlign: "center" },
  inputContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#e1e8df", borderRadius: 6, paddingHorizontal: 10, paddingVertical: 6 },
  input: { marginLeft: 10, flex: 1, fontSize: 16 },
  modalActions: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  modalButton: { padding: 10, borderRadius: 6 },
  cancelButton: { backgroundColor: "#b04e4e" },
  saveButton: { backgroundColor: "#4b6652" },
  cancelButtonText: { color: "white", fontWeight: "bold" },
  saveButtonText: { color: "white", fontWeight: "bold" },
  searchContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#e1e8df", borderRadius: 6, paddingHorizontal: 10, paddingVertical: 6, marginBottom: 20 },
  searchInput: { marginLeft: 10, flex: 1, fontSize: 16 },
  userItem: { flexDirection: "row", alignItems: "center", padding: 10, borderRadius: 6, backgroundColor: "#e1e8df", marginBottom: 10 },
  selectedUser: { backgroundColor: "#d4e6d9" },
  userAvatar: { backgroundColor: "#4b6652", padding: 10, borderRadius: 50, marginRight: 12 },
  userAvatarText: { color: "white", fontSize: 16, fontWeight: "bold" },
  userName: { flex: 1, fontSize: 16, color: "#4b6652" },
  loader: { marginTop: 20 },
});
