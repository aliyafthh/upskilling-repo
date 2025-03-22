import 'package:bubble_tea_app/models/shop.dart';
import 'package:bubble_tea_app/pages/home_page.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => BubbleTeaShop(),
      builder: (context, child)=> MaterialApp(
        debugShowCheckedModeBanner: false,
        home: HomePage(),
        theme: ThemeData(primarySwatch: Colors.brown,    appBarTheme: AppBarTheme(
      backgroundColor: Colors.brown, // Explicitly set AppBar color
      foregroundColor: Colors.white, // Set text/icons to white for contrast
    ),),
      ),
    );
  }
}