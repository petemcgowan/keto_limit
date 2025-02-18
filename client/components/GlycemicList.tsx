import React, { useContext, useState, useEffect, memo } from 'react'
import {
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'
import FavFoodList from './FavFoodList'
import SearchBar from './SearchBar'
// import SearchFoodList from './SearchFoodList'
import SearchFoodFlatlistFilter from './SearchFoodFlatlistFilter'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { ThemeContext } from '../state/ThemeContext'
import UserContext from '../state/UserContext'

const { width } = Dimensions.get('screen')

interface GlycemicListProps {
  searchPhrase: string
  setClicked: (clicked: boolean) => void
}

const GlycemicList = ({ searchPhrase, setClicked }: GlycemicListProps) => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useContext was used outside of the theme provider')
  }
  const { theme } = context
  const styles = getStyles(theme)
  const [searchPhraseNew, setSearchPhraseNew] = useState('')
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)
  const { userId } = useContext(UserContext)

  const favouriteAction = async () => {
    setShowOnlyFavorites(!showOnlyFavorites)
  }

  return (
    <SafeAreaView style={styles.searchAndList_container}>
      <View style={styles.searchAndFavourite}>
        <View style={styles.searchContainer}>
          <SearchBar
            searchPhrase={searchPhraseNew}
            setSearchPhrase={setSearchPhraseNew}
            clicked={showOnlyFavorites}
            setClicked={setClicked}
          />
        </View>
        <View style={styles.favButton}>
          <TouchableOpacity onPress={favouriteAction}>
            <FontAwesome5
              name="heart"
              size={RFPercentage(3.9)}
              color={showOnlyFavorites ? 'rgb(76,187,23)' : 'rgb(76,187,23)'}
              solid={showOnlyFavorites}
            />
          </TouchableOpacity>
        </View>
      </View>
      {showOnlyFavorites && <FavFoodList searchPhraseNew={searchPhraseNew} />}
      {!showOnlyFavorites && (
        <SearchFoodFlatlistFilter searchPhraseNew={searchPhraseNew} />
      )}
    </SafeAreaView>
  )
}

function arePropsEqual(prevProps, nextProps) {
  return prevProps.foodName === nextProps.foodName
}

export default memo(GlycemicList, arePropsEqual)

const getStyles = (theme) =>
  StyleSheet.create({
    searchAndList_container: {
      backgroundColor: theme.viewBackground,
    },
    searchAndFavourite: {
      flexDirection: 'row',
    },
    searchContainer: {
      width: width * 0.85,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.viewBackground,
      paddingLeft: 10,
      borderRadius: 10,
      borderColor: theme.tableLineColor,
      borderWidth: 2,
      marginLeft: 10,
    },
    favButton: {
      flex: 1, // puts fav icons in line with each other
      alignItems: 'center',
      justifyContent: 'center',
      width: width * 0.15,
    },
  })
