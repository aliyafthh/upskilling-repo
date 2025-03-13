import 'package:bubble_tea_app/components/bottom_nav_bar.dart';
import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {

int _selectedIndex = 0;
void navigateBottomBar(int newIndex){
setState(() {
  _selectedIndex = newIndex;
});
}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.brown,
      bottomNavigationBar: MyBottomNavBar(onTabChange: (index)=> navigateBottomBar(index),),
    );
  }
}