import React from 'react';
import { Ionicons } from "@expo/vector-icons";

export default function Icon ({name, size, focused}) {
  return (
    <Ionicons 
      name={name}
      size={size}
      color={focused ? focused : "#1b83e3"}
    />
  )
}