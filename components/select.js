import React from "react";

import {
  StyleSheet,
  View,
  Button,
} from "react-native";

export default function Select({selectWatched,setSelectWatched}) {
  // const [watched, setWatched] = useState(false);

  //color
  // red - false
  // green - true

  return (
    <View style={styles.btnlist}>
      <View style={styles.margin}>
        <Button
          title="Watched"
          disabled={selectWatched}
          color={selectWatched ? "green" : "red"}
          onPress={() => setSelectWatched(!selectWatched)}
          //     style={{ color: watched ? "red" : "yellow" }}
        />
      </View>
      <View style={styles.margin}>
        <Button
          title="NOT Watched"
          disabled={!selectWatched}
          color={selectWatched ? "green" : "red"}
          onPress={() => setSelectWatched(!selectWatched)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnlist: {
    flexDirection: "row",
    justifyContent: "center",
  },
  margin: {
    margin: 10,
  },
});
