// letcode_test.cpp : 此文件包含 "main" 函数。程序执行将在此处开始并结束。
//

#include <iostream>
#include <math.h>

int point_contain_line(int linex1, int liney1, int linex2, int liney2, double pointx, double pointy)
{
    double f64Point2DistanceS1 = sqrt(pow((pointx - linex1), 2) + pow((pointy - liney1), 2));
    double f64Point2DistanceS2 = sqrt(pow((pointx - linex2), 2) + pow((pointy - liney2), 2));
    double f64Point2DistanceS3 = sqrt(pow((linex1 - linex2), 2) + pow((liney1 - liney2), 2));

    printf("%lf + %lf = %lf , %lf\n", f64Point2DistanceS1, f64Point2DistanceS2, f64Point2DistanceS1+ f64Point2DistanceS2,f64Point2DistanceS3);
    double f32Temp = f64Point2DistanceS1 + f64Point2DistanceS2;
    if ((f32Temp - 10E-6) <= f64Point2DistanceS3 && f64Point2DistanceS3 <= (f32Temp + 10E-6) )
    {
        return 0;
    }
    else
    {
        return -1;
    }
}

double* intersection(int* start1, int start1Size, int* end1, int end1Size, int* start2, int start2Size, int* end2, int end2Size, int* returnSize) 
{
    double* f64Rtn = NULL;
    f64Rtn = (double *)malloc(20);
    //static double f64Rtn[2] = { 0 };
    *returnSize = 0;

    int i32L1X1 = start1[0];
    int i32L1Y1 = start1[1];
    int i32L1X2 = end1[0];
    int i32L1Y2 = end1[1];

    int i32L2X1 = start2[0];
    int i32L2Y1 = start2[1];
    int i32L2X2 = end2[0];
    int i32L2Y2 = end2[1];

    printf("LINE1 = {%d, %d}, {%d, %d}. LINE2 = {%d, %d}, {%d, %d}\n", i32L1X1, i32L1Y1, i32L1X2, i32L1Y2, i32L2X1, i32L2Y1, i32L2X2, i32L2Y2);
    //Ax+By+C=0
    //直线1
    int i32L1A = i32L1Y2 - i32L1Y1;
    int i32L1B = i32L1X1 - i32L1X2;
    int i32L1C = i32L1A * i32L1X1 + i32L1B * i32L1Y1;
    //直线2
    int i32L2A = i32L2Y2 - i32L2Y1;
    int i32L2B = i32L2X1 - i32L2X2;
    int i32L2C = i32L2A * i32L2X1 + i32L2B * i32L2Y1;
    //交点坐标X,Y
    int i32L1ContainFlag = 0;
    int i32L2ContainFlag = 0;
    if ( 0 == (i32L1A * i32L2B - i32L2A * i32L1B) )
    {
        //平行，平行中可能存在重叠，也可能不重叠
        //printf("两条直线平行\n");
        if (i32L1C * i32L2A == i32L1A * i32L2C)
        {
            //重叠还需判断是否有交点
            int i32Ret0 = point_contain_line(i32L1X1, i32L1Y1, i32L1X2, i32L1Y2, (double)i32L2X1, (double)i32L2Y1);
            int i32Ret1 = point_contain_line(i32L1X1, i32L1Y1, i32L1X2, i32L1Y2, (double)i32L2X2, (double)i32L2Y2);

            int i32Ret2 = point_contain_line(i32L2X1, i32L2Y1, i32L2X2, i32L2Y2, (double)i32L1X1, (double)i32L1Y1);
            int i32Ret3 = point_contain_line(i32L2X1, i32L2Y1, i32L2X2, i32L2Y2, (double)i32L1X2, (double)i32L1Y2);

            printf("两条延申直线重叠: %d, %d ,%d ,%d\n", i32Ret0, i32Ret1, i32Ret2, i32Ret3);
            if (0 == i32Ret0 || 0 == i32Ret1 || 0 == i32Ret2 || 0 == i32Ret3)
            {
                //任何一个点被对方线段包含，则一定存在交点
                if (i32L1X1 == i32L1X2)
                {
                    printf("该直线与X轴垂直\n");
                    //此时只能判断Y轴
                    if (0 == i32Ret0 && 0 == i32Ret1)
                    {
                        //线段2被线段1完全包含，取Y轴小值
                        if (i32L2Y1 < i32L2Y2)
                        {
                            *returnSize = 2;
                            f64Rtn[0] = i32L2X1;
                            f64Rtn[1] = i32L2Y1;
                        }
                        else
                        {
                            *returnSize = 2;
                            f64Rtn[0] = i32L2X2;
                            f64Rtn[1] = i32L2Y2;
                        }
                    }
                    else if (0 == i32Ret2 && 0 == i32Ret3)
                    {
                        //线段1被线段2完全包含，取Y轴小值
                        if (i32L1Y1 < i32L1Y2)
                        {
                            *returnSize = 2;
                            f64Rtn[0] = i32L1X1;
                            f64Rtn[1] = i32L1Y1;
                        }
                        else
                        {
                            *returnSize = 2;
                            f64Rtn[0] = i32L1X2;
                            f64Rtn[1] = i32L1Y2;
                        }
                    }
                    else
                    {
                        //线段1与线段2互相包含,取Y轴小值
                        if (0 == i32Ret0 && 0 == i32Ret2)
                        {
                            if (i32L2Y1 < i32L1Y1)
                            {
                                *returnSize = 2;
                                f64Rtn[0] = i32L2X1;
                                f64Rtn[1] = i32L2Y1;
                            }
                            else
                            {
                                *returnSize = 2;
                                f64Rtn[0] = i32L1X1;
                                f64Rtn[1] = i32L1Y1;
                            }
                        }
                        else if (0 == i32Ret0 && 0 == i32Ret3)
                        {
                            if (i32L2Y1 < i32L1Y2)
                            {
                                *returnSize = 2;
                                f64Rtn[0] = i32L2X1;
                                f64Rtn[1] = i32L2Y1;
                            }
                            else
                            {
                                *returnSize = 2;
                                f64Rtn[0] = i32L1X2;
                                f64Rtn[1] = i32L1Y2;
                            }
                        }
                        else if (0 == i32Ret1 && 0 == i32Ret2)
                        {
                            if (i32L2Y2 < i32L1Y1)
                            {
                                *returnSize = 2;
                                f64Rtn[0] = i32L2X2;
                                f64Rtn[1] = i32L2Y2;
                            }
                            else
                            {
                                *returnSize = 2;
                                f64Rtn[0] = i32L1X1;
                                f64Rtn[1] = i32L1Y1;
                            }
                        }
                        else if (0 == i32Ret1 && 0 == i32Ret3)
                        {
                            if (i32L2Y2 < i32L1Y2)
                            {
                                *returnSize = 2;
                                f64Rtn[0] = i32L2X2;
                                f64Rtn[1] = i32L2Y2;
                            }
                            else
                            {
                                *returnSize = 2;
                                f64Rtn[0] = i32L1X2;
                                f64Rtn[1] = i32L1Y2;
                            }
                        }
                    }
                }
                else
                {
                    //此时可以判断X轴
                    if (0 == i32Ret0 && 0 == i32Ret1)
                    {
                        //线段2被线段1完全包含，取X轴小值
                        if (i32L2X1 < i32L2X2)
                        {
                            *returnSize = 2;
                            f64Rtn[0] = i32L2X1;
                            f64Rtn[1] = i32L2Y1;
                        }
                        else
                        {
                            *returnSize = 2;
                            f64Rtn[0] = i32L2X2;
                            f64Rtn[1] = i32L2Y2;
                        }
                    }
                    else if (0 == i32Ret2 && 0 == i32Ret3)
                    {
                        //线段1被线段2完全包含，取X轴小值
                        if (i32L1X1 < i32L1X2)
                        {
                            *returnSize = 2;
                            f64Rtn[0] = i32L1X1;
                            f64Rtn[1] = i32L1Y1;
                        }
                        else
                        {
                            *returnSize = 2;
                            f64Rtn[0] = i32L1X2;
                            f64Rtn[1] = i32L1Y2;
                        }
                    }
                    else
                    {
                        //线段1与线段2互相包含,取Y轴小值
                        if (0 == i32Ret0 && 0 == i32Ret2)
                        {
                            if (i32L2X1 < i32L1X1)
                            {
                                *returnSize = 2;
                                f64Rtn[0] = i32L2X1;
                                f64Rtn[1] = i32L2Y1;
                            }
                            else
                            {
                                *returnSize = 2;
                                f64Rtn[0] = i32L1X1;
                                f64Rtn[1] = i32L1Y1;
                            }
                        }
                        else if (0 == i32Ret0 && 0 == i32Ret3)
                        {
                            if (i32L2X1 < i32L1X2)
                            {
                                *returnSize = 2;
                                f64Rtn[0] = i32L2X1;
                                f64Rtn[1] = i32L2Y1;
                            }
                            else
                            {
                                *returnSize = 2;
                                f64Rtn[0] = i32L1X2;
                                f64Rtn[1] = i32L1Y2;
                            }
                        }
                        else if (0 == i32Ret1 && 0 == i32Ret2)
                        {
                            if (i32L2X2 < i32L1X1)
                            {
                                *returnSize = 2;
                                f64Rtn[0] = i32L2X2;
                                f64Rtn[1] = i32L2Y2;
                            }
                            else
                            {
                                *returnSize = 2;
                                f64Rtn[0] = i32L1X1;
                                f64Rtn[1] = i32L1Y1;
                            }
                        }
                        else if (0 == i32Ret1 && 0 == i32Ret3)
                        {
                            if (i32L2X2 < i32L1X2)
                            {
                                *returnSize = 2;
                                f64Rtn[0] = i32L2X2;
                                f64Rtn[1] = i32L2Y2;
                            }
                            else
                            {
                                *returnSize = 2;
                                f64Rtn[0] = i32L1X2;
                                f64Rtn[1] = i32L1Y2;
                            }
                        }
                    }
                }
            }
            else
            {
                printf("两条直线重叠，但没有交点\n");
                //NULL
            }
        }
        else
        {
            printf("两条直线平行但不重叠，没有交点\n");
            //NULL
        }
    }
    else
    {
        double f64X = (1.0f * i32L2B * i32L1C - i32L1B * i32L2C) / (1.0f * i32L1A* i32L2B- i32L2A* i32L1B);
        double f64Y = (1.0f * i32L1A * i32L2C - i32L2A * i32L1C) / (1.0f * i32L1A * i32L2B - i32L2A * i32L1B);
        printf("直线交点：{%lf, %lf}\n", f64X, f64Y);
        //判断交点是否同时在两个线段内
        //判断交点是否在线段1内
        i32L1ContainFlag = point_contain_line(i32L1X1, i32L1Y1, i32L1X2, i32L1Y2, f64X, f64Y);
        //判断交点是否在线段2内
        i32L2ContainFlag = point_contain_line(i32L2X1, i32L2Y1, i32L2X2, i32L2Y2, f64X, f64Y);

        if (0 == i32L1ContainFlag && 0 == i32L2ContainFlag)
        {
            *returnSize = 2;
            f64Rtn[0] = f64X;
            f64Rtn[1] = f64Y;
        }
        else
        {
            printf("交点不在线段内...%d, %d\n", i32L1ContainFlag, i32L2ContainFlag);
            //NULL
        }
    }

    if (0 == *returnSize)
    {
        return NULL;
    }
    else
    {
        return f64Rtn;
    }
}

int main()
{
    printf("Hello World!\n");

    double *f64Rtn = NULL;
    int returnSize = 0;

    int start1[2] = { 0, -1 };
    int end1[2] = { 0, 1 };

    int start2[2] = { -1, 1 };
    int end2[2] = { 1, 3 };

    f64Rtn = intersection(start1, 2, end1, 2, start2, 2, end2, 2, &returnSize);

    if (NULL != f64Rtn)
    {
        printf("计算结果：{%lf, %lf}, %d", f64Rtn[0], f64Rtn[1], returnSize);
    }
    else
    {
        printf("计算结果：NULL\n");
    }
}
