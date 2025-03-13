import 'package:flutter/material.dart';
import 'package:google_nav_bar/google_nav_bar.dart';

class MyBottomNavBar extends StatelessWidget {
  void Function(int)? onTabChange;
   MyBottomNavBar({super.key, required this.onTabChange});

  @override
  Widget build(BuildContext context) {
    return GNav(
      onTabChange: (value)=> onTabChange,
      padding: EdgeInsets.all(25.0),
      mainAxisAlignment: MainAxisAlignment.center,
      activeColor: Colors.white,
      color: Colors.grey[300],
      tabActiveBorder: Border.all(color: Colors.white),
      gap: 8,
      tabs: [
      GButton(icon: Icons.home, text: 'Shop'),
            GButton(icon: Icons.shopping_bag, text: 'Cart'),
    ]);
  }
}