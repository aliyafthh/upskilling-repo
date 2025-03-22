import 'package:bubble_tea_app/models/drink.dart';
import 'package:bubble_tea_app/models/shop.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class OrderPage extends StatefulWidget {
  final Drink drink;

  const OrderPage({super.key, required this.drink});

  @override
  State<OrderPage> createState() => _OrderPageState();
}

class _OrderPageState extends State<OrderPage> {
  double sweetnessLevel = 0.5;
  double iceLevel = 0.5;
  double pearlLevel = 0.5;

  void customizeSweet(double value) {
    setState(() {
      sweetnessLevel = value;
    });
  }

  void customizeIce(double value) {
    setState(() {
      iceLevel = value;
    });
  }

  void customizePearl(double value) {
    setState(() {
      pearlLevel = value;
    });
  }

  void addToCart() {
    Provider.of<BubbleTeaShop>(context, listen: false).addToCart(widget.drink);

    Navigator.pop(context);

    showDialog(
        context: context,
        builder: (context) =>
            AlertDialog(title: Text("Successfully added to cart")));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.drink.name),
      ),
      backgroundColor: Colors.brown[200],
      body: Column(
        children: [
          Image.asset(widget.drink.imagePath),
          Padding(
            padding: const EdgeInsets.all(25.0),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const SizedBox(width: 100, child: Text('Sweet')),
                    Expanded(
                      child: Slider(
                          value: sweetnessLevel,
                          label: sweetnessLevel.toString(),
                          divisions: 4,
                          onChanged: (value) => customizeSweet(value)),
                    )
                  ],
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const SizedBox(width: 100, child: Text('Ice')),
                    Expanded(
                      child: Slider(
                          value: iceLevel,
                          label: iceLevel.toString(),
                          divisions: 4,
                          onChanged: (value) => customizeIce(value)),
                    )
                  ],
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const SizedBox(width: 100, child: Text('Pearl')),
                    Expanded(
                      child: Slider(
                          value: pearlLevel,
                          label: pearlLevel.toString(),
                          divisions: 4,
                          onChanged: (value) => customizePearl(value)),
                    )
                  ],
                )
              ],
            ),
          ),
          MaterialButton(
              color: Colors.brown,
              onPressed: () => addToCart(),
              child: const Text(
                "Add to cart",
                style: TextStyle(color: Colors.white),
              ))
        ],
      ),
    );
  }
}
