import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import Icon from "./Icon";
import allAction from "../store/actions";

export default function Card({ data }) {
  const status = useSelector((state) => state.contact.statusEdit);
  const loading = useSelector((state) => state.contact.loading);
  const idCard = useSelector((state) => state.contact.idCard);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(data.firstName);
  const [lastName, setLastName] = useState(data.lastName);
  const [showAction, setShowAction] = useState(false);
  const [age, setAge] = useState(String(data.age));
  const [display, setDisplay] = useState("none");
  const [detail, setDetail] = useState(false);
  const [bottom, setBottom] = useState(0);
  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    const contactEdit = {
      firstName,
      lastName,
      age: Number(age),
      photo: data.photo ? data.photo : "N/A",
    };
    const id = data.id;
    dispatch(allAction.contact.put(id, contactEdit));
  };

  const handleDelete = () => {
    const id = data.id;
    dispatch(allAction.contact.del(id));
  };

  if (status) {
    setTimeout(() => {
      dispatch(allAction.contact.setStatus("edit", ""));
    }, 3000);
  }

  if (data.id !== idCard && (detail || display === "flex")) {
    setDetail(false);
    setDisplay("none");
  }

  return (
    <View style={{ marginBottom: bottom }}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.containerTitle}
          onPress={() => {
            setDetail(!detail);
            setDisplay(display == "flex" ? "none" : "flex");
            setBottom(display == "flex" ? 0 : 10);
            dispatch(allAction.contact.setIdCard(data.id));
          }}
          activeOpacity={1}
        >
          <View style={styles.row}>
            <Image
              style={styles.containerImage}
              source={{
                uri: data.photo.includes("http")
                  ? data.photo
                  : "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-contact-512.png",
              }}
            />
            <Text style={styles.textSubject}>{data.firstName}</Text>
          </View>
        </TouchableOpacity>
        {showAction ? (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                setShowAction(false);
                setDisplay("flex");
                setBottom(10);
                setDetail(false);
                dispatch(allAction.contact.setIdCard(data.id));
              }}
              style={{ marginRight: 20 }}
            >
              <Icon name="md-create" size={30} focused={"#3dbc6d"} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowAction(false);
                handleDelete();
              }}
              style={{ marginRight: 20 }}
            >
              <Icon name="ios-trash" size={30} focused={"#eb2323"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowAction(false)}>
              <Icon name="ios-close-circle" size={30} focused="black" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setShowAction(true)}>
            <Icon
              name="ios-ellipsis-horizontal-sharp"
              size={30}
              focused="black"
            />
          </TouchableOpacity>
        )}
      </View>
      {detail && idCard === data.id ? (
        <View
          style={[
            styles.contentContainer,
            { maxHeight: 350, marginTop: -50, display },
            styles.row,
          ]}
        >
          <View>
            <Text style={styles.textBody}>First Name</Text>
            <Text style={styles.textBody}>Last Name</Text>
            <Text style={styles.textBody}>Age</Text>
          </View>
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.textBody}>: {data.firstName}</Text>
            <Text style={styles.textBody}>: {data.lastName}</Text>
            <Text style={styles.textBody}>: {data.age}</Text>
          </View>
        </View>
      ) : (
        <View
          style={[
            styles.contentContainer,
            { maxHeight: 350, marginTop: -50, display },
          ]}
        >
          {status ? (
            <Text
              style={{
                color: status === "Contact edited" ? "#3dbc6d" : "#eb2323",
              }}
            >
              {status}
            </Text>
          ) : (
            <Text></Text>
          )}
          <Text style={styles.textBody}>First Name</Text>
          <TextInput
            value={String(firstName)}
            onChangeText={(firstName) => setFirstName(firstName)}
            style={[styles.input, { paddingLeft: 20 }]}
          />
          <Text style={styles.textBody}>Last Name</Text>
          <TextInput
            value={String(lastName)}
            onChangeText={(lastName) => setLastName(lastName)}
            style={[styles.input, { paddingLeft: 20 }]}
          />
          <Text style={styles.textBody}>Age</Text>
          <TextInput
            value={String(age)}
            onChangeText={(age) => setAge(age)}
            style={[styles.input, { paddingLeft: 20 }]}
            keyboardType="number-pad"
          />
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setEdit(true);
                handleEdit();
              }}
              activeOpacity={1}
            >
              {edit ? (
                loading ? (
                  <ActivityIndicator size="small" color="#e4f9f5" />
                ) : (
                  setEdit(false)
                )
              ) : (
                <Text style={styles.buttonText}>Edit</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "#eb2323", marginLeft: 20 },
              ]}
              onPress={() => {
                setDisplay("none");
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setAge(String(data.age));
              }}
              activeOpacity={1}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    padding: 10,
    borderRadius: 40,
    marginBottom: 10,
    paddingRight: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1b83e3",
    justifyContent: "space-between",
  },
  containerImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#f0f0f0",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  textSubject: {
    marginBottom: 10,
    marginLeft: 10,
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  buttonText: {
    color: "#f0f0f0",
    textAlign: "center",
    fontWeight: "bold",
  },
  button: {
    height: 30,
    width: 100,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1b83e3",
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 30,
    borderColor: "#1b83e3",
    borderTopLeftRadius: 5,
  },
});
