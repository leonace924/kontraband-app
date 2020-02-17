import React from "react";
import { Image, TextInput, View, TouchableOpacity, Text } from "react-native";

import styles from './styles';
import { withNavigation } from 'react-navigation';

const Header = props => {
	return (
		<View style={styles.headerMain}>
			<View style={styles.headerBar}>
				<Text style={styles.logInText}>Profile</Text>
				<TouchableOpacity onPress={() => props.navigation.goBack()}>
					<Image
						style={[styles.crossImage, styles.crossImageView]}
						source={require("../../assets/images/Cross.png")}
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.SearchFieldView}>
				<TextInput
					// value={this.state.search}
					// style={[styles.inputField, props.styles]}
					underlineColorAndroid="transparent"
					placeholder='Search...'
					placeholderTextColor="#cecece"
					autoCapitalize="none"
				// secureTextEntry={props.textSecure}
				// onChangeText={props._handleInput()}
				/>
				<Image
					style={styles.crossImage}
					source={require('../../assets/images/searchImage.png')}
				/>
			</View>
		</View>
	);
};

export default withNavigation(Header);