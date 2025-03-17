import React  from 'react';
import { StyleSheet,Text, View,TouchableOpacity,Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation,useRoute } from '@react-navigation/native';




export default function ShareExpensesPage1(){
  const navigation = useNavigation();
  const route = useRoute();

  const[groups,setGroups] = useState([]);

  React.useEffect(() => {
    if (route.params?.newGroupName) {
      setGroups((prevGroups) => [...prevGroups, route.params.newGroupName]);
    }
  }, [route.params?.newGroupName]);

  return(
    <View style = {styles.screenWrapper}>
    <Text style = {styles.headTitleWrapper}>
     Share expenses with your Friends </Text>
     <Image
  style={styles.image}
  source={require('./Images/SharingExpenses.jpeg')}

  />

{groups.length === 0 ? (
        <Text style={styles.name}>No groups to show</Text>
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.groupItem}>
              <Icon name="group" size={30} />
              <Text style={styles.groupText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}

     

    <TouchableOpacity style ={styles.menuItem} onPress = {() => navigation.navigate('ShareExpensesPage2')}>
    <Icon name = "group" size = {40} />
    <Text style = {styles.menuText}> + Start a New Group  </Text>
    </TouchableOpacity >
    
    <View style={styles.bottomNav}>
    <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
      <Icon name="home" size={30} color="#00008B" />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('ProfilePage')}>
      <Icon name="user" size={30} color="#00008B" />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('ShareExpensesPage')}>
      <Icon name="group" size={30} color="#00008B" />
    </TouchableOpacity>
  </View>
  </View>
  )
}

const  styles = StyleSheet.create({
  screenWrapper:{
    flex:1,
    paddingTop:80,
    padding:10,
    backgroundColor:'#87CEEB'
  },
  headTitleWrapper:{
    fontSize:27,
    fontWeight: 'bold',
    paddingLeft:10,
    color:'#FFFFFF'
  },
  profileimage:{
    width:'100%',
    height:180,
    resizeMode:'contain',
    borderRadius:20,
    marginVertical:16,
    color:'#FFFFFF'
  },
  name:{
    textAlign:'center',
    fontSize:24,
    fontWeight:'bold',
    color:'#FFFFFF'
  },
  bottomNav:{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
    menuItem:{
    flexDirection: 'row',
    alignItems:'center',
    marginVertical:10,
    marginTop:20,
    marginRight:20,
    backgroundColor:'#E0E0E0',
    padding:10,
    borderRadius:20,
    shadowOpacity:0.3,
    elevation:10,
    paddingLeft:40

  },
  menuText:{
    fontSize:18,
    marginLeft:10,
    color:'#FFFFFF'
  }

})
