Core Foundation 与 Foundation 框架中类型的互相转换

NSString\NSArray\NSDictionary : Foundaiton框架

CFStringRef\CFArrayRef\CFDictionaryRef :  Core Foundation框架

Foundation和Core Foundation的数据类型是可以相互转换的，必须用__bridge关键字进行安全的桥接转换

```objective-c

NSString *text = @"啊哈哈哈哈";

// String转换为CF框架中的StringRef

CFStringRef str = (__bridge CFStringRef)text;

```





- images.assets里如果图片下面显示的是unassigned都是代表不会被打包到main bundle资源包里面的
- scrollView可能显示两个滚动条，所以scrollView.subviews可能会包含两种滚动条。建议不要使用scrollView.subviews按照数组的索引得到特定的子控件